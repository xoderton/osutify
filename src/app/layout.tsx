import { Player } from "@/src/components/Player";
import { Sidebar } from "@/src/components/Sidebar";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { getPacks } from "./actions/getPacks";
import "./globals.css";

const font = Roboto_Flex({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "osu!tify",
  description: "Spotify but with osu! songs",
  authors: [ { name: "shockpast", url: "https://github.com/shockpast" }, { name: "richardscull", url: "https://github.com/richardscull" } ],
  category: "osu",
  keywords: ["osu", "spotify", "player", "audio", "nextjs", "osu-player-music", "osu-player", "web-player", "osu-api"]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const packs = await getPacks();

  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar packs={packs}>{children}</Sidebar>
        <Player />
      </body>
    </html>
  );
}
