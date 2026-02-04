import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export interface User {
  id: string;
  name: string;
}

export async function GET(request: NextResponse) {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return NextResponse.json(users);
}
