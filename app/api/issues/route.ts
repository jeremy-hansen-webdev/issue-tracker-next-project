import { prisma } from "@/lib/prisma/prisma";
import { createIssueSchema } from "@/lib/validation/issues";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = createIssueSchema.parse(body);
    const post = await prisma.issue.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });

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

export async function GET() {
  try {
    console.log("GET /api/issues called");
    const issues = await prisma.issue.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log("Fetched issues:", issues);
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fecth issues" },
      { status: 500 },
    );
  }
}
