import type { Metadata } from "next";
import { Forum } from "next/font/google";
import "./globals.css";
import MenuComponent2 from "@/components/Globals/MenuComponent";
import FooterComponent from "@/components/Globals/FooterComponent";
import SmoothScrollWrapper from "@/components/Globals/SmoothScrollWrapper";

const forumFont = Forum({
  variable: "--font-forum",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className={`${forumFont.variable} antialiased`}>
        <SmoothScrollWrapper>
          <MenuComponent2 />
          <div className="mt-[76px]">{children}</div>
          <FooterComponent />
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
