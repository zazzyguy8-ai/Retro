import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth";
import { TimeGuard } from "@/components/TimeGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dial-Up — The Internet You Remember",
  description: "The world's first anti-social media. Built slow. Built real. Like 1997 never ended.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="retro-scrollbar">
        <AuthProvider>
          <TimeGuard>{children}</TimeGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
