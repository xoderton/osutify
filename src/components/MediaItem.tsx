"use client";

import usePlayer from "@/src/app/hooks/usePlayer";
import { Pack, Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: { media: Pack | Song, location: boolean };
  truncate?: boolean;
  onClick?: (id: string) => void;
}

export function MediaItem({ data, truncate, onClick }: MediaItemProps) {
  const onPlayer = usePlayer();

  function handleClick() {
    if (onClick) onClick(data.media.id);
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={data.media.thumbnail || "/images/unknown.jpg"}
          alt="Image"
          className="object-cover"
          loading="lazy"
          blurDataURL="/images/unknown.jpg"
          placeholder="blur"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden ">
        <p
          title={data.media.title}
          className={`font-semibold ${!data.location && onPlayer.activeSong?.id == data.media.id ? "text-[#1ed760]" : "text-neutral-100"} truncate w-full`}
        >
          {truncate ? data.media.title.slice(0, 45) + "..." : data.media.title}
        </p>
        <p
          title={data.media.author}
          className="text-neutral-400 text-sm truncate w-full"
        >
          {data.media.author}
        </p>
      </div>
    </div>
  );
}
