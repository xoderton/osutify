"use client";

import usePlayer from "@/src/app/hooks/usePlayer";
import { PlayerContent } from "./PlayerContent";

export function Player() {
  const player = usePlayer();
  if (!player.activeSong) return null;

  const songUrl = "/api/getSongAudio?id=" + player.activeSong.id;
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={player.activeSong} songUrl={songUrl} />
    </div>
  );
}
