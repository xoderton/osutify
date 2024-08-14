import { Song } from "@/types";
import usePlayer from "./usePlayer";

export default function useOnPlay(songs: Song[]) {
  const player = usePlayer();

  const onPlay: (id: string) => void = (id) => {
    const song: Song = songs.find((song) => song.id === id) as Song;

    player.setSong(song);
    player.setSongs(songs);
  };

  return onPlay;
}
