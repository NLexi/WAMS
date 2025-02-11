import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import SignupPage from "@/app/auth/signup/page";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("SignupPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: "1", name: "Engineering" }]),
            })
        ) as jest.Mock;
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
        render(<SignupPage />);
        
        const selects = screen.getAllByRole("combobox");
        const roleSelect = selects[0];

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

    it("redirects to sign-in page on successful sign-up", async () => {
        await act(async () => {
            render(<SignupPage />);
        });

        await waitFor(() => {
            expect(screen.getByText("Engineering")).toBeInTheDocument();
        });

        const selects = screen.getAllByRole("combobox");
        const roleSelect = selects[0];

        await userEvent.selectOptions(roleSelect, "ADMIN");
        expect(roleSelect).toHaveValue("ADMIN");

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test User" } });

        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
        });

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/auth/signin"));
    });
});
