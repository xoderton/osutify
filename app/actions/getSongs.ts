import { Song } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { checkSongCover } from "./utils";

export async function getSongs(): Promise<Song[]> {
  const cookieStore = cookies();
  if (!cookieStore.get("osu_access_token")) return [];

  try {
    const { beatmapsets } = await axios
      .get("https://osu.ppy.sh/api/v2/beatmapsets/search", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("osu_access_token")?.value}`,
        },
      })
      .then((res) => res.data);

    if (!beatmapsets) {
      return [];
    }

    await Promise.all(
      beatmapsets.map(async (song: any) => {
        await checkSongCover(song);
      })
    );

    const songs = beatmapsets.map((song: any) => ({
      id: song.id,
      author: song.artist,
      title: song.title,
      song_url: song.preview_url,
      thumbnail: song.covers.cover,
    }));

    return songs;
  } catch (err) {
    console.error(err);
    return [];
  }
}
