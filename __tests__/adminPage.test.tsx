import React from "react";
import { render, screen } from "@testing-library/react";
import AdminPage from "@/app/admin/page";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("../app/api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

describe("AdminPage", () => {
  it("renders the admin page for ADMIN role", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({ user: { role: "ADMIN" } });
    const page = await AdminPage();
    render(page);
    expect(screen.getByText("Welcome to the admin page")).toBeInTheDocument();
  });

  it("renders access denied for non-admin role", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({ user: { role: "USER" } });
    const page = await AdminPage();
    render(page);
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });
});
