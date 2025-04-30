import "./globals.css";

export const metadata = {
  title: "Jogo da somatória",
  description: "Jogo da somatória",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen w-full flex justify-center bg-[url('/images/bg.png')] bg-cover bg-center bg-no-repeat">
        <main className="w-full max-w-4xl p-5">{children}</main>
      </body>
    </html>
  );
}
