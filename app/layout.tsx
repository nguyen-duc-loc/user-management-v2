import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import ColorToggle from "@/components/ColorToggle";
import ModeToggle from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ColorProvider } from "@/hooks/useColor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User management",
  description: "User management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorProvider>
            <div className="container mx-auto mt-10 px-4 md:mt-12  md:w-3/4 xl:w-3/5">
              <header className="mb-10 md:mb-12">
                <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row">
                  <h1 className="mb-2 text-2xl font-semibold tracking-tight lg:text-3xl">
                    User management
                  </h1>
                  <div className="flex gap-4">
                    <ColorToggle />
                    <ModeToggle />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage your team members here.
                </p>
              </header>
              <main>{children}</main>
            </div>

            <Toaster />
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
