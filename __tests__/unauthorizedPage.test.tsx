import { render, screen, waitFor } from "@testing-library/react";
import UnauthorizedPage from "@/app/unauthorized/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe("UnauthorizedPage", () => {
    it("renders the UnauthorizedPage with correct text", () => {
        render(<UnauthorizedPage />);

        expect(screen.getByText("Access Denied")).toBeInTheDocument();
        expect(screen.getByText("You do not have permission to access this page.")).toBeInTheDocument();
        expect(screen.getByText("Redirecting to protected....")).toBeInTheDocument();
    });

    it("redirects to /protected after 2.5 seconds", async () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        render(<UnauthorizedPage />);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/protected");
        }, { timeout: 3000 });
    });
});
