import "../../styles/globals.css";
import Script from "next/script";

export const metadata = {
  title: "PostcardRu.com",
  description: "Virtual Postcards from the 90s",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
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
