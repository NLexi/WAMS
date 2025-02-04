import { NextResponse } from "next/server";

export async function POST() {
    const response = new NextResponse(null, {
        status: 200,
    });

    response.headers.append(
        "Set-Cookie",
        "refreshToken=; HttpOnly; Secure; Path=/; Max-Age=0"
    );

    response.headers.append(
        "Set-Cookie",
        "next-auth.csrf-token=; HttpOnly; Secure; Path=/; Max-Age=0"
    )

    return response;
}
