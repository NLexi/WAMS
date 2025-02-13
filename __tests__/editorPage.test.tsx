import React from "react";
import { render, screen } from "@testing-library/react";
import EditorPage from "@/app/editor/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("../app/api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("EditorPage", () => {
  it("renders the editor page for EDITOR role", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({ user: { role: "EDITOR" } });
    const page = await EditorPage();
    render(page);
    expect(screen.getByText("Welcome to the editor page")).toBeInTheDocument();
  });

  it("renders the editor page for ADMIN role", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({ user: { role: "ADMIN" } });
    const page = await EditorPage();
    render(page);
    expect(screen.getByText("Welcome to the editor page")).toBeInTheDocument();
  });

  it("redirects for non-editor non-admin role", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({ user: { role: "USER" } });
    await EditorPage();
    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });
});
