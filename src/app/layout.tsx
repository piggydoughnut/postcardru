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
      <body className={""}>{children}</body>
    </html>
  );
}
