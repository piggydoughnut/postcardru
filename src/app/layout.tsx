import "../../styles/globals.css";

import ReactGA from "react-ga4";

export const metadata = {
  title: "Postcardru.com",
  description: "Main",
};

ReactGA.initialize(process.env.NEXT_PUBLIC_GA ?? "");
ReactGA.send("pageview");

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
      <body>{children}</body>
    </html>
  );
}
