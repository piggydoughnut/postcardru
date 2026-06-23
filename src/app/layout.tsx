import "../../styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PostcardRu – Send a Free Online Postcard with Music",
    template: "%s | PostcardRu",
  },
  description:
    "Send a free virtual postcard with music, animated backgrounds and a personal message. A nostalgic 2000s online postcard experience rebuilt from the original postcard.ru.",
  keywords: [
    "free online postcard",
    "virtual postcard",
    "send postcard online",
    "postcard with music",
    "2000s postcard",
    "nostalgic postcard",
    "greeting card",
    "postcard.ru",
  ],
  metadataBase: new URL("https://postcardru.com"),
  openGraph: {
    title: "PostcardRu – Send a Free Online Postcard with Music",
    description:
      "Send a free virtual postcard with music, animated backgrounds and a personal message. A nostalgic 2000s online postcard experience.",
    url: "https://postcardru.com",
    siteName: "PostcardRu",
    images: [
      {
        url: "https://postcardru.com/_next/image?url=%2Fpostcardimages%2Flove_love%2F22.jpg&w=828&q=75",
        width: 828,
        alt: "PostcardRu – Virtual Postcards with Music",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PostcardRu – Send a Free Online Postcard with Music",
    description:
      "Send a free virtual postcard with music, animated backgrounds and a personal message. A nostalgic 2000s online postcard experience.",
    images: [
      "https://postcardru.com/_next/image?url=%2Fpostcardimages%2Flove_love%2F22.jpg&w=828&q=75",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
