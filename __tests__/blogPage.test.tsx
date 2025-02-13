
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogPage from "@/app/blog/page";
import { getServerSession } from "next-auth";
import BlogClient from "@/app/blog/blogClient";
import React from "react";
import { hasPagePermission } from "@/utils/permissions";
import "@testing-library/jest-dom";
import * as jose from "jose";

jest.mock("next-auth", () => ({
    __esModule: true,
    default: jest.fn((options) => {
        return async (req: any, res: any) => { };
    }),
    getServerSession: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
    getSession: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("jose", () => {
    return {
        compactDecrypt: jest.fn(),
    };
});

describe("BlogPage", () => {
    it("renders BlogClient with session", async () => {
        (getServerSession as jest.Mock).mockResolvedValueOnce({
            user: { permissions: { blog: ["POST", "PUT", "DELETE"] } },
        });

        const page = await BlogPage();
        render(page);

        expect(screen.getByText("First Post")).toBeInTheDocument();
        expect(screen.getByText("Second Post")).toBeInTheDocument();
    });
});

jest.mock("@/utils/permissions", () => ({
    hasPagePermission: jest.fn(),
}));

const initialBlogPosts = [
    { id: 1, title: "First Post", content: "This is the first blog post." },
    { id: 2, title: "Second Post", content: "This is the second blog post." },
];

describe("BlogClient", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders initial blog posts", () => {
        (hasPagePermission as jest.Mock).mockReturnValue(false);
        render(<BlogClient session={null} />);
        expect(screen.getByText("First Post")).toBeInTheDocument();
        expect(screen.getByText("Second Post")).toBeInTheDocument();
    });

    it("shows create post section if user has create permission", () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => method === "POST");
        render(<BlogClient session={{ user: { permissions: { blog: ["POST"] } } }} />);
        expect(screen.getByText("Create a New Post")).toBeInTheDocument();
    });

    it("creates a new post when create button is clicked", async () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => method === "POST");
        render(<BlogClient session={{ user: { permissions: { blog: ["POST"] } } }} />);

        const titleInput = screen.getByPlaceholderText("Title");
        const contentInput = screen.getByPlaceholderText("Content");
        fireEvent.change(titleInput, { target: { value: "New Post" } });
        fireEvent.change(contentInput, { target: { value: "New content" } });

        fireEvent.click(screen.getByText("Create Post"));

        await waitFor(() => {
            expect(screen.getByText("New Post")).toBeInTheDocument();
            expect(screen.getByText("New content")).toBeInTheDocument();
        });
    });

    it("shows update and delete buttons if permissions are granted", () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => {
            return method === "PUT" || method === "DELETE";
        });
        render(<BlogClient session={{ user: { permissions: { blog: ["PUT", "DELETE"] } } }} />);

        const updateButtons = screen.getAllByText("Update");
        const deleteButtons = screen.getAllByText("Delete");
        expect(updateButtons.length).toBeGreaterThan(0);
        expect(deleteButtons.length).toBeGreaterThan(0);
    });

    it("updates a post when update button is clicked", async () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => method === "PUT");
        render(<BlogClient session={{ user: { permissions: { blog: ["PUT"] } } }} />);

        const originalPrompt = window.prompt;
        window.prompt = jest.fn()
            .mockReturnValueOnce("Updated Title")
            .mockReturnValueOnce("Updated Content");

        const updateButton = screen.getAllByRole("button", { name: "Update" })[0];
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText("Updated Title")).toBeInTheDocument();
            expect(screen.getByText("Updated Content")).toBeInTheDocument();
        });

        window.prompt = originalPrompt;
    });

    it("deletes a post when delete button is clicked", async () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => method === "DELETE");
        render(<BlogClient session={{ user: { permissions: { blog: ["DELETE"] } } }} />);

        const deleteButtons = screen.getAllByText("Delete");
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(screen.queryByText("First Post")).not.toBeInTheDocument();
        });
    });

    it("does not create a new post when title or content is empty", async () => {
        (hasPagePermission as jest.Mock).mockImplementation((_, page, method) => method === "POST");

        render(<BlogClient session={{ user: { permissions: { blog: ["POST"] } } }} />);

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
