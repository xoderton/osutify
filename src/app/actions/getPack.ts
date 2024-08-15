import { Song } from "@/types";
import axios from "axios";
import { checkSongCover } from "./utils";
import { cookies } from "next/headers";

interface GetPackResponse {
  packName: string;
  songs: Song[];
}

export async function getPack(tag: string): Promise<GetPackResponse> {
  const accessToken = cookies().get("access_token")
  if (!accessToken)
    return { packName: "Not found", songs: [] };

  try {
    const data = await axios
      .get(`https://osu.ppy.sh/api/v2/beatmaps/packs/${tag}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      })
      .then((res) => res.data);

    const { beatmapsets } = data;

    if (!beatmapsets) return { packName: "Not found", songs: [] };

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

    return { packName: data.name, songs };
  } catch (err) {
    console.error(err);
    return { packName: "Not found", songs: [] };
  }
}
