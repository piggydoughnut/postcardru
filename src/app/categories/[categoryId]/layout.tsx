import "../../../../styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Postcardru.com: Categories",
  description: "Virtual Postcards from the 90s.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta property="og:title" content="PostcardRu.com: Virtual Postcards" />
      <meta
        property="og:description"
        content="Virtual Postcards from the 90s"
      />
      <meta
        property="og:image"
        content="https://postcardru.com/_next/image?url=%2Fpostcardimages%2Flove_love%2F22.jpg&w=828&q=75"
      />
      <meta property="og:url" content="https://postcardru.com/" />
      <meta property="og:type" content="website" />
      <body className={inter.className}>
        <div className="flex flex-col justify-center items-center max-w-[750px] mx-auto pb-6">
          {children}
        </div>
      </body>
    </html>
  );
}
