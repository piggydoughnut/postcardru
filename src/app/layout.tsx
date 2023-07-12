import "../../styles/globals.css";

export const metadata = {
  title: "Postcardru.com",
  description: "Main",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={""}>{children}</body>
    </html>
  );
}
