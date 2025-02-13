import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LogoutButton } from "@/components/logoutButton";
import { signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(() => Promise.resolve()),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe("LogoutButton", () => {
  it("calls fetch and signOut on click", async () => {
    render(<LogoutButton />);
    const button = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
      expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/auth/signin" });
    });
  });
});
