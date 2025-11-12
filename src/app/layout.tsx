import type { Metadata } from "next";
import "./globals.css";
import ToastNotificationsWrapper from "../components/toastNotificationWrapper";

export const metadata: Metadata = {
  title: "YouSwap",
  description: "Exchange your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastNotificationsWrapper />
        {children}
      </body>
    </html>
  );
}
