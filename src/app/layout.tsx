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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "widget-web-component": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        projectid: string;
      };
    }
  }
}

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
        <div style={{ position: "fixed", bottom: "50px", right: "20px" }}>
          <widget-web-component projectid="clztyubg70001ycxvkeeleplh"></widget-web-component>

          <script
            async
            src="https://opinify-widget-w24d.vercel.app/widget.umd.js"
          ></script>
        </div>
      </body>
    </html>
  );
}
