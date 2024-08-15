import { Song } from "@/types";
import axios from "axios";
import { checkSongCover } from "./utils";
import { cookies } from "next/headers";

export async function getSongsByQuery(
  query: string,
  showUnranked: boolean = false
): Promise<Song[]> {
  if (query == "")
    return [];

  const accessToken = cookies().get("access_token")
  if (!accessToken)
    return [];

  try {
    const { beatmapsets } = await axios
      .get(
        `https://osu.ppy.sh/api/v2/beatmapsets/search?nsfw=true${
          query && `&q=${query}`
        }${showUnranked ? "&s=any" : "&s=ranked"}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      )
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
      creator: song.creator,
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
