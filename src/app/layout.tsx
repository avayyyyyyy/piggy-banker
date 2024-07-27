import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "@/components/Footer";
import { getTransactions } from "@/lib/FinanceAdvisor";

export const metadata: Metadata = {
  title: "Piggy Banker",
  description: "You personalized finance management app.",
};

getTransactions();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ThemeProvider>

        <Toaster closeButton expand richColors position="bottom-right" />
        <Footer />
      </body>
    </html>
  );
}
