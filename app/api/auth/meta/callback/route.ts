import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const user = await currentUser();

  // If not logged in, send them to sign-in then back to connections
  if (!user) {
    return NextResponse.redirect(
      "http://localhost:3000/sign-in?redirect_url=/connections"
    );
  }

  const userId = user.id;

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) return new Response("No code returned from Meta", { status: 400 });

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const redirectUri = process.env.META_REDIRECT_URI;

  if (!appId || !appSecret || !redirectUri) {
    return new Response(
      "Missing META_APP_ID / META_APP_SECRET / META_REDIRECT_URI in .env",
      { status: 500 }
    );
  }

  // 1) Exchange code for access token
  const tokenRes = await fetch(
    "https://graph.facebook.com/v19.0/oauth/access_token?" +
      new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        redirect_uri: redirectUri,
        code,
      })
  );

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token as string | undefined;

  if (!accessToken) {
    return new Response(
      `Failed to get access token. Response: ${JSON.stringify(tokenData)}`,
      { status: 400 }
    );
  }

  // 2) Fetch ad accounts
  const accountsRes = await fetch(
    `https://graph.facebook.com/v19.0/me/adaccounts?fields=id,name&access_token=${accessToken}`
  );

  const accountsData = await accountsRes.json();
  console.log("META adaccounts response:", accountsData);

  // 3) Save accounts to DB
  for (const acc of accountsData.data ?? []) {
    await prisma.adAccount.upsert({
      where: {
        platform_accountId: {
          platform: "meta",
          accountId: acc.id,
        },
      },
      update: {
        accountName: acc.name,
        userId, // Clerk user id
      },
      create: {
        platform: "meta",
        accountId: acc.id,
        accountName: acc.name,
        userId,
      },
    });
  }

  return NextResponse.redirect("http://localhost:3000/connections");
}
