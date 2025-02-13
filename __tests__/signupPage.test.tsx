import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "@/app/auth/signup/page";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "whatwg-fetch";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

describe("SignupPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn((url: string) => {
            if (url === "/api/departments") {
                return Promise.resolve(new Response(JSON.stringify([{ id: "1", name: "Engineering" }]), { status: 200 }));
            }
            return Promise.resolve(new Response(JSON.stringify({ error: "Signup failed" }), { status: 400 }));
        }) as jest.Mock;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders the sign-up form", async () => {
        await act(async () => {
            render(<SignupPage />);
        });

        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    });

    it("shows error when form validation fails", async () => {
        act(() => {
            render(<SignupPage />);
        });

        const roleSelect = screen.getAllByRole("combobox")[0];

        await userEvent.selectOptions(roleSelect, "ADMIN");
        expect(roleSelect).toHaveValue("ADMIN");

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "invalid-email" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "test" } });

        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => {
            expect(screen.getByText("Invalid email format")).toBeInTheDocument();
        });
    });

    it("redirects to sign-in page on successful sign-up as ADMIN", async () => {
        global.fetch = jest.fn((url: string) => {
            if (url === "/api/departments") {
                return Promise.resolve(new Response(JSON.stringify([{ id: "1", name: "Engineering" }]), { status: 200 }));
            }
            if (url === "/api/auth/signup") {
                return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
            }
            return Promise.resolve(new Response(JSON.stringify({ error: "Signup failed" }), { status: 400 }));
        }) as jest.Mock;

        await act(async () => {
            render(<SignupPage />);
        });

        await waitFor(() => {
            expect(screen.getByText("Engineering")).toBeInTheDocument();
        });

        const roleSelect = screen.getAllByRole("combobox")[0];
        await userEvent.selectOptions(roleSelect, "ADMIN");
        expect(roleSelect).toHaveValue("ADMIN");

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test User" } });

        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/auth/signin"));
    });

    it("redirects to sign-in page on successful sign-up as any other user type", async () => {
        global.fetch = jest.fn((url: string) => {
            if (url === "/api/departments") {
                return Promise.resolve(new Response(JSON.stringify([{ id: "Engineering", name: "Engineering" }]), { status: 200 }));
            }
            if (url === "/api/auth/signup") {
                return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
            }
            return Promise.resolve(new Response(JSON.stringify({ error: "Signup failed" }), { status: 400 }));
        }) as jest.Mock;

        await act(async () => {
            render(<SignupPage />);
        });

        await waitFor(() => {
            expect(screen.getByText("Engineering")).toBeInTheDocument();
        });

        const roleSelect = screen.getAllByRole("combobox")[0];
        const deptSelect = screen.getAllByRole("combobox")[1];
        await userEvent.selectOptions(roleSelect, "USER");
        await userEvent.selectOptions(deptSelect, "Engineering");
        expect(roleSelect).toHaveValue("USER");
        expect(deptSelect).toHaveValue("Engineering");

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test User" } });

        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/auth/signin"));
    });

    it("shows an error if fetching departments response error", async () => {
        jest.spyOn(global, "fetch").mockImplementationOnce(() =>
            Promise.resolve(new Response(JSON.stringify({}), { status: 500 }))
        );

        await act(async () => {
            render(<SignupPage />);
        });

        const errorMessage = await screen.findByText("Error fetching departments: Failed to fetch departments");
        expect(errorMessage).toBeInTheDocument();
    });

    it("shows an error if signup request fails", async () => {
        global.fetch = jest.fn((url: string) => {
            if (url === "/api/departments") {
                return Promise.resolve(
                    new Response(JSON.stringify([{ id: "1", name: "Engineering" }]), { status: 200 })
                );
            }
            if (url === "/api/auth/signup") {
                return Promise.resolve(
                    new Response(JSON.stringify({ success: false }), { status: 500 })
                );
            }
            return Promise.resolve(new Response("{}", { status: 200 }));
        }) as jest.Mock;

        await act(async () => {
            render(<SignupPage />);
        });

        const roleSelect = screen.getAllByRole("combobox")[0];
        await userEvent.selectOptions(roleSelect, "ADMIN");
        expect(roleSelect).toHaveValue("ADMIN");

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test User" } });

        await userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        const signupError = await screen.findByText("Signup failed", {}, { timeout: 3000 });
        expect(signupError).toBeInTheDocument();
    });

    it("Shows an error if role is not ADMIN and department not selected", async () => {
        global.fetch = jest.fn((url: string) => {
            if (url === "/api/departments") {
                return Promise.resolve(new Response(JSON.stringify([{ id: "1", name: "Engineering" }]), { status: 200 }));
            }
            if (url === "/api/auth/signup") {
                return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
            }
            return Promise.resolve(new Response(JSON.stringify({ error: "Signup failed" }), { status: 400 }));
        }) as jest.Mock;

        await act(async () => {
            render(<SignupPage />);
        });

        await waitFor(() => {
            expect(screen.getByText("Engineering")).toBeInTheDocument();
        });

        const roleSelect = screen.getAllByRole("combobox")[0];
        await userEvent.selectOptions(roleSelect, "USER");

        
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test User" } });
        
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        const errorMessage = await screen.findByText("Please select a department");
        expect(errorMessage).toBeInTheDocument();
    });
});
