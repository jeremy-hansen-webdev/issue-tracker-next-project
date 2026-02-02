import { prisma } from "@/lib/prisma/prisma";
import { createIssueSchema } from "@/lib/validation/issues";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const id = Number((await params).id);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
    }
    const body = await request.json();
    const data = createIssueSchema.parse(body);

    const patch = await prisma.issue.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    revalidatePath("/issues");
    revalidatePath(`/issues/${id}`);

    return NextResponse.json({ ok: true, patch }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: error.issues.map((i) => ({
            path: i.path.join("."),
            massage: i.message,
          })),
        },
        { status: 400 },
      );
    }
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = Number((await params).id);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
    }
    await prisma.issue.delete({
      where: { id },
    });

    revalidatePath("/issues");
    revalidatePath(`/issues/${id}`);

    return NextResponse.json({ message: "Issue deleted" }, { status: 200 });
  } catch (error) {
    console.log("DELETE /api/issues/[id] error:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
