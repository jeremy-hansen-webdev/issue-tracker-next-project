import { prisma } from "@/lib/prisma/prisma";
import { createIssueSchema } from "@/lib/validation/issues";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import authOptions from "../auth/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      { error: "Unauthorized to visit this route" },
      { status: 401 },
    );

  try {
    const body = await request.json();
    const data = createIssueSchema.parse(body);
    const post = await prisma.issue.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });

    revalidatePath("/issues");

    return NextResponse.json({ ok: true, post }, { status: 201 });
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
