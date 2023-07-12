import "../../../../styles/globals.css";

import { Inter } from "next/font/google";
import TopNavigation from "@/components/TopNavigation";

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
        <div className="flex flex-col justify-center items-center max-w-[750px] mx-auto">
          <div className="w-full pt-2 px-7">
            <TopNavigation title="Choose a postcard" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
