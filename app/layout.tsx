import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { themeInitScript } from "@/lib/services/theme.service";
import InlineScript from "@/components/ui/inline-script";
import Toaster from "@/components/ui/toast/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giunti Psychometrics Italy",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased motion-safe:scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeInitScript} />
      </head>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
