"use client";
import useOnPlay from "@/app/hooks/useOnPlay";
import { LikeButton } from "@/components/LikeButton";
import { MediaItem } from "@/components/MediaItem";
import { Song } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export function LikedContent() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    async function fetchData() {
      const likedSongs = localStorage.getItem("liked_songs");
      if (!likedSongs || likedSongs.length === 0) return setLoading(false);

      const songs = await axios
        .post(
          "/api/getSongsByIds",
          {
            ids: JSON.parse(likedSongs),
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => res.data);
      setLoading(false);

      if (songs.message) return; // Means we got an error
      setSongs(songs);
    }

    fetchData();
  }, []);

  if (!songs || songs.length === 0 || loading) {
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
        {loading ? "Loading..." : "No liked songs"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: Song, index: number) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <p className="text-neutral-400 text-center" style={{ width: "30px" }}>
            {index + 1}
          </p>
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={{ media: song, location: false }} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}

export default LikedContent;
