import { Song } from "@/types";
import axios from "axios";
import { checkSongCover } from "./utils";
import { cookies } from "next/headers";

export async function getSongs(): Promise<Song[]> {
  const accessToken = cookies().get("access_token")
  if (!accessToken)
    return [];

  try {
    const { beatmapsets } = await axios
      .get("https://osu.ppy.sh/api/v2/beatmapsets/search", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      })
      .then((res) => res.data);

    if (!beatmapsets)
      return [];

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
