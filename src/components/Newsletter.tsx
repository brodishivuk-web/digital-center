"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-brand-navy">
      <div className="container-page flex flex-col items-center gap-5 py-14 text-center text-white">
        <h2 className="text-2xl font-extrabold sm:text-3xl">מבצעים וטיפים ישר למייל</h2>
        <p className="max-w-md text-sm text-white/70">
          הצטרפו לרשימת התפוצה שלנו וקבלו עדכונים על קורסים חדשים, מבצעים בלעדיים וטיפים שימושיים בשיווק דיגיטלי.
        </p>
        {status === "success" ? (
          <p className="rounded-full bg-brand-blue/20 px-5 py-3 text-sm font-semibold text-brand-blue">
            נרשמתם בהצלחה! תודה שהצטרפתם 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="הכניסו את כתובת המייל שלכם"
              className="w-full flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-brand-blue"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue-dark disabled:opacity-60"
            >
              <Send size={16} />
              {status === "loading" ? "נרשם..." : "הרשמה"}
            </button>
          </form>
        )}
        {status === "error" && <p className="text-sm text-red-400">משהו השתבש, נסו שוב מאוחר יותר.</p>}
      </div>
    </section>
  );
}
