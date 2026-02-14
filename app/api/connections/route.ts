import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const accounts = await prisma.adAccount.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ accounts });
}
