import { Resend } from "resend";

const STORE_EMAIL = process.env.STORE_EMAIL ?? "brodi.shivuk@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Digital Center <onboarding@resend.dev>";

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export const storeEmail = STORE_EMAIL;

export async function sendEmail(params: { to: string; subject: string; html: string }) {
  const resend = getClient();
  if (!resend) {
    console.log(`[email skipped - RESEND_API_KEY not set] to: ${params.to} | subject: ${params.subject}`);
    return { sent: false as const };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
    return { sent: true as const };
  } catch (error) {
    console.error("Failed to send email", error);
    return { sent: false as const };
  }
}
