import { NextRequest, NextResponse } from "next/server";
import { sendEmail, storeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "כתובת מייל לא תקינה" }, { status: 400 });
  }

  await sendEmail({
    to: storeEmail,
    subject: "הרשמה חדשה לניוזלטר - Digital Center",
    html: `<p>מנוי חדש נרשם לניוזלטר:</p><p><strong>${email}</strong></p>`,
  });

  return NextResponse.json({ ok: true });
}
