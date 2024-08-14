"use client";

import { LikeButton } from "@/src/components/LikeButton";
import { Song } from "@/types";
import { MediaItem } from "@/src/components/MediaItem";
import useOnPlay from "@/src/app/hooks/useOnPlay";
import usePlayer from "@/src/app/hooks/usePlayer";
import { LuHardDriveDownload } from "react-icons/lu";

export function PlaylistContent({ songs }: { songs: Song[] }) {
  const onPlay = useOnPlay(songs);
  const onPlayer = usePlayer();

  if (!songs || songs.length === 0) {
    return (
      <div
        className="
          flex
          flex-col
          gap-y-2
          w-full px-6
          text-neutral-400
        "
      >
        We couldn&apos;t find any songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: Song, index: number) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <p className={`${onPlayer.activeSong?.id == song.id ? "text-[#1ed760]" : "text-neutral-400"} text-center`} style={{ width: "30px" }}>
            {index + 1}
          </p>
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={{ media: song, location: false }} />
          </div>
          <LikeButton songId={song.id} />
          <a download href={`https://direct.osuokayu.moe/api/v1/download/${song.id}`}>
            <LuHardDriveDownload size={24} className="hover:opacity-75 transition"></LuHardDriveDownload>
          </a>
        </div>
      ))}
    </div>
  );
}

export default PlaylistContent;
