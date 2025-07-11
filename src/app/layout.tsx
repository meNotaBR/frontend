import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";
import { isMobile } from "@/hooks/user-agent";
import MobileFooter from "@/components/MobileFooter";
import { Toaster } from "sonner";
import getCookie from "./actions/get-cookie-action";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "meNota",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = (await headers()).get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  const token = await getCookie('token');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container mx-auto px-4">{children}</div>
          {mobileCheck && token ? (<MobileFooter/>) : ('')}
          <Toaster theme="dark" className="flex absolute"/>
        </ThemeProvider>
      </body>
    </html>
  );
}
