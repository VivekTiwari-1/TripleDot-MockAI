import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TripleDot - AI Mocker",
  description: "AI-Based Mock interview",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} style={{ backgroundColor: "black" }}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
