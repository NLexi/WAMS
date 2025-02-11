import { render, screen, waitFor } from "@testing-library/react";
import Forbidden from "@/app/403/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

describe("Forbidden Page", () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it("renders the access denied message", () => {
        render(<Forbidden />);
        expect(screen.getByText("Access Denied")).toBeInTheDocument();
        expect(screen.getByText("You do not have permission to access this page.")).toBeInTheDocument();
        expect(screen.getByText("Redirecting to dashboard....")).toBeInTheDocument();
    });

    it("redirects to the dashboard after timeout", async () => {
        render(<Forbidden />);
        jest.advanceTimersByTime(2500);

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
    });
});
