import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Digital Center - דיגיטל סנטר | קורסים דיגיטלים בשיווק",
  description:
    "קורסים דיגיטלים קצרים וישירים לעניין בשיווק ממומן, שיווק אורגני, קידום אתרים, כלי AI וצילום ועריכת סרטונים - במחירים לכל כיס.",
  metadataBase: new URL("https://digital-center.vercel.app"),
  openGraph: {
    title: "Digital Center - דיגיטל סנטר",
    description: "קורסים דיגיטלים בשיווק דיגיטל - קצרים, ישירים לעניין, ובמחיר שמתאים לכל כיס.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}
