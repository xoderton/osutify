import { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  songs: Song[];
  activeSong?: Song;
  volume?: number;
  loop?: boolean;
  muted?: boolean;
  setSong: (song: Song) => void;
  setSongs: (ids: Song[]) => void;
  setVolume: (volume: number) => void;
  setLoop: (loop: boolean) => void;
  setMuted: (mute: boolean) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  songs: [],
  activeSong: undefined,
  volume: 0.1 / 25,
  loop: false,
  muted: false,
  setSong: (song: Song) => set({ activeSong: song }),
  setSongs: (songs: Song[]) => set({ songs: songs }),
  setVolume: (volume: number) => set({ volume: volume }),
  setLoop: (loop: boolean) => set({ loop: loop }),
  setMuted: (mute: boolean) => set({ muted: mute }),
  reset: () => set({ songs: [], activeSong: undefined }),
}));

export default usePlayer;
