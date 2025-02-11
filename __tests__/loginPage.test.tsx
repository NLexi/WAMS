import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

global.fetch = jest.fn();
jest.spyOn(window, "alert").mockImplementation(() => {});

describe("LoginPage", () => {
    beforeEach(() => {
        sessionStorage.clear();
        (global.fetch as jest.Mock).mockClear();
    });

    it("renders the LoginPage correctly", () => {
        render(<LoginPage />);
        expect(screen.getByRole("heading", { level: 1, name: "Login" })).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    it("updates email and password fields on user input", () => {
        render(<LoginPage />);

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(emailInput, { target: { value: "user@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput).toHaveValue("user@example.com");
        expect(passwordInput).toHaveValue("password123");
    });

    it("makes a fetch request on successful login", async () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ role: "ADMIN" }),
        });

        render(<LoginPage />);
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "admin@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "securepassword" } });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/auth/login", expect.anything());
            expect(sessionStorage.getItem("UserRole")).toBe("ADMIN");
            expect(pushMock).toHaveBeenCalledWith("/protected");
        });
    });

    it("shows an alert on failed login", async () => {
        jest.spyOn(window, "alert").mockImplementation(() => {});

        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        render(<LoginPage />);
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "wrong@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith("Login failed");
        });
    });
});
