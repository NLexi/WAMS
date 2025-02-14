import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { title, content } = await req.json();
    const { id } = context.params;

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
