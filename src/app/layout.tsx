import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FURIA Fan Chat",
  description: "Chatbot não-oficial para fãs da FURIA Esports",
  icons: {
    icon: "/images/furiaIcon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen max-w-screen justify-center bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed text-gray-100 grid grid-rows-[1fr_auto]">
        <main className="overflow-auto">{children}</main>
      </body>
    </html>
  );
}
