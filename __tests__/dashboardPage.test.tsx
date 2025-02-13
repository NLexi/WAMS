import { act, render, screen } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import { getServerSession } from "next-auth";
import "@testing-library/jest-dom";
import * as jose from "jose";

jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn((options) => {
    return async (req: any, res: any) => {};
  }),
  getServerSession: jest.fn(),
}));


jest.mock("next-auth/react", () => ({
  getSession: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("jose", () => {
  return {
    compactDecrypt: jest.fn(),
  };
});  

describe("Dashboard Page", () => {
  it("renders the user name", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { name: "John Doe", role: "USER" },
    });

    let dashboardContent;
    await act(async () => {
      dashboardContent = await Dashboard();
    });
    render(dashboardContent);

    expect(await screen.findByText("Welcome, John Doe")).toBeInTheDocument();
  });

  it("shows Admin button only for ADMIN role", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { name: "Admin User", role: "ADMIN" },
    });

    let dashboardContent;
    await act(async () => {
      dashboardContent = await Dashboard();
    });
    render(dashboardContent);

    expect(await screen.findByText("Admin")).toBeInTheDocument();
    expect(await screen.findByText("Editor")).toBeInTheDocument();
  });

  it("does not show Admin nor Editor button for non-admin users", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { name: "Regular User", role: "USER" },
    });

    let dashboardContent;
    await act(async () => {
      dashboardContent = await Dashboard();
    });
    render(dashboardContent);

    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
    expect(screen.queryByText("Editor")).not.toBeInTheDocument();
  });

  it("always shows the Logout button", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { name: "User", role: "USER" },
    });

    let dashboardContent;
    await act(async () => {
      dashboardContent = await Dashboard();
    });
    render(dashboardContent);

    expect(await screen.findByText("Sign out")).toBeInTheDocument();
  });
});
