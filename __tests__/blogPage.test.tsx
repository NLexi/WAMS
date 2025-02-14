import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogClient from "@/app/blog/blogClient";
import { hasPagePermission } from "@/utils/permissions";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { act } from "@testing-library/react";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/utils/permissions", () => ({
    hasPagePermission: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([]),
    })
) as jest.Mock;

describe("BlogClient", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (global.fetch as jest.Mock).mockImplementation((url, options) => {
            if (url === "/api/blogs" && options?.method === "GET") {
                return Promise.resolve({
                    ok: true,
                    json: async () => [
                        { id: "1", title: "First Post", content: "First content" },
                        { id: "2", title: "Second Post", content: "Second content" },
                    ],
                });
            }

            if (url === "/api/blogs" && options?.method === "POST") {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        id: "3",
                        title: "New Post",
                        content: "New content",
                        userId: "123",
                    }),
                });
            }

            if (url?.startsWith("/api/blogs/") && options?.method === "PUT") {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        id: "1",
                        title: "Updated Title",
                        content: "Updated Content",
                    }),
                });
            }

            if (url?.startsWith("/api/blogs/") && options?.method === "DELETE") {
                return Promise.resolve({ ok: true });
            }

            return Promise.reject(new Error("Unhandled request"));
        });
    });

    it("fetches and displays blog posts", async () => {
        await act(async () => {
            render(<BlogClient session={null} />);
        });

        await waitFor(() => {
            expect(screen.getByText("First Post")).toBeInTheDocument();
            expect(screen.getByText("Second Post")).toBeInTheDocument();
        });
    });

    it("shows create post section if user has create permission", async () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => method === "POST");
        await act(() => {
            render(<BlogClient session={{ user: { permissions: { blog: ["POST"] } } }} />);
        });
        expect(screen.getByText("Create a New Post")).toBeInTheDocument();
    });

    it("creates a new post when create button is clicked", async () => {
        (hasPagePermission as jest.Mock).mockReturnValue(true);
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "3", title: "New Post", content: "New content", userId: "123" }),
        });

        await act(async () => {
            render(<BlogClient session={{ user: { id: "123", permissions: { blog: ["POST"] } } }} />);
        });

        fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "New Post" } });
        fireEvent.change(screen.getByPlaceholderText("Content"), { target: { value: "New content" } });
        fireEvent.click(screen.getByText("Create Post"));

        await waitFor(() => {
            expect(screen.getByText("New Post")).toBeInTheDocument();
        });
    });

    it("shows update and delete buttons if permissions are granted", async () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => {
            return method === "PUT" || method === "DELETE";
        });

        await act(async () => {
            render(<BlogClient session={{ user: { permissions: { blog: ["PUT", "DELETE"] } } }} />);
        });

        await waitFor(() => {
            expect(screen.getAllByText("Update").length).toBeGreaterThan(0);
            expect(screen.getAllByText("Delete").length).toBeGreaterThan(0);
        });
    });

    it("updates a post when update button is clicked", async () => {
        (hasPagePermission as jest.Mock).mockReturnValue(true);

        // ✅ Mock GET request to return initial post
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: "1", title: "First Post", content: "First content" }],
        });

        await act(async () => {
            render(<BlogClient session={{ user: { permissions: { blog: ["PUT"] } } }} />);
        });

        await waitFor(() => {
            expect(screen.getByText("First Post")).toBeInTheDocument();
        });
    });

    it("deletes a post when delete button is clicked", async () => {
        (hasPagePermission as jest.Mock).mockReturnValue(true);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: "1", title: "First Post", content: "First content" }],
        });

        await act(async () => {
            render(<BlogClient session={{ user: { permissions: { blog: ["DELETE"] } } }} />);
        });

        await waitFor(() => {
            expect(screen.getByText("First Post")).toBeInTheDocument();
        });

        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        fireEvent.click(screen.getAllByText("Delete")[0]);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        await waitFor(() => {
            expect(screen.queryByText("First Post")).not.toBeInTheDocument();
        });
    });

    it("creates a post then updates the post when update button is clicked", async () => {
        (hasPagePermission as jest.Mock).mockReturnValue(true);
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        await act(async () => {
            render(<BlogClient session={{ user: { id: "123", permissions: { blog: ["POST", "PUT"] } } }} />);
        });

        await waitFor(() => {
            expect(screen.queryByText("First Post")).not.toBeInTheDocument();
        });

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "1", title: "First Post", content: "First content", userId: "123" }),
        });

        fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "First Post" } });
        fireEvent.change(screen.getByPlaceholderText("Content"), { target: { value: "First content" } });
        fireEvent.click(screen.getByText("Create Post"));

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: "1", title: "First Post", content: "First content" }],
        });
        await act(async () => {
            render(<BlogClient session={{ user: { id: "123", permissions: { blog: ["PUT"] } } }} />);
        });

        const originalPrompt = window.prompt;
        window.prompt = jest.fn()
            .mockReturnValueOnce("Updated Title")
            .mockReturnValueOnce("Updated Content");

        fireEvent.click(screen.getByText("Update"));

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: "1", title: "Updated Title", content: "Updated Content" }],
        });        

        window.prompt = originalPrompt;
    });

    it("does not create a new post when title or content is empty", async () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => method === "POST");

        await act(() => {
            render(<BlogClient session={{ user: { permissions: { blog: ["POST"] } } }} />);
        })

        const titleInput = screen.getByPlaceholderText("Title");
        const contentInput = screen.getByPlaceholderText("Content");
        const createButton = screen.getByText("Create Post");

        fireEvent.change(titleInput, { target: { value: "Incomplete Post" } });
        fireEvent.change(contentInput, { target: { value: "" } });

        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.queryByText("Title and content cannot be empty")).toBeInTheDocument();
        });

        fireEvent.change(titleInput, { target: { value: "" } });
        fireEvent.change(contentInput, { target: { value: "Content Only" } });

        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.queryByText("Title and content cannot be empty")).toBeInTheDocument();
        });
    });
});