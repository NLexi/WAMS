import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";
import SignIn from "@/app/auth/signin/page";

const mockPush = jest.fn();
const mockSignIn = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock("next-auth/react", () => ({
    signIn: (...args: any) => mockSignIn(...args),
}));

Object.defineProperty(window, "location", {
  value: { href: jest.fn() },
  writable: true,
});

describe("SignIn Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the sign-in form", () => {
        render(<SignIn />);
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("shows error message for invalid email format", async () => {
        render(<SignIn />);
    
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "xample-com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
        fireEvent.click(screen.getByText("Login"));
    
        await waitFor(() => expect(screen.getByText("Invalid email address")).toBeInTheDocument());
    });    

    it("redirects to dashboard on successful login", async () => {
        mockSignIn.mockResolvedValueOnce({ error: null });

        render(<SignIn />);
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "user@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
    });

    it("redirects to dashboard on failed login", async () => {
        mockSignIn.mockResolvedValueOnce({ error: true });

        render(<SignIn />);
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => expect(screen.getByText("Invalid email or password")).toBeInTheDocument());
    });
});
