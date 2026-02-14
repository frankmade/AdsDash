import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ accounts: [] }, { status: 401 });
  }

  const accounts = await prisma.adAccount.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      platform: true,
      accountId: true,
      accountName: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ accounts });
}
