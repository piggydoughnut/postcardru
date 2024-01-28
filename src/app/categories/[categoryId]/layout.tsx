import "../../../../styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Postcardru.com - Categories",
  description: "Categories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-center items-center max-w-[750px] mx-auto pb-6">
          {children}
        </div>
      </body>
    </html>
  );
}
