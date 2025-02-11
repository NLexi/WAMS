import { render, screen, waitFor } from "@testing-library/react";
import AuthErrorPage from "@/app/auth/error/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe("AuthErrorPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    it("renders authentication error message", () => {
        render(<AuthErrorPage />);
        expect(screen.getByText("Authentication Error")).toBeInTheDocument();
    });

    it("redirects to sign-in page after timeout", async () => {
        jest.useFakeTimers();
        render(<AuthErrorPage />);
        jest.advanceTimersByTime(1000);
        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/auth/signin"));
        jest.useRealTimers();
    });
});
