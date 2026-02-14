import { NextResponse } from "next/server";

export async function GET() {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.META_REDIRECT_URI;

  if (!appId || !redirectUri) {
    return new Response("Missing META_APP_ID or META_REDIRECT_URI in .env", {
      status: 500,
    });
  }

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "public_profile", // BASIC ONLY (always valid)
  });

  // Use the non-versioned dialog endpoint (more forgiving)
  return NextResponse.redirect(
    `https://www.facebook.com/dialog/oauth?${params.toString()}`
  );
}
