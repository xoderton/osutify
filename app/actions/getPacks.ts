import { Pack } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { checkSongCover } from "./utils";

export async function getPacks(): Promise<Pack[]> {
  const cookieStore = cookies();
  if (!cookieStore.get("osu_access_token")) return [];

  try {
    const data = await axios
      .get(`https://osu.ppy.sh/api/v2/beatmaps/packs?type=artist`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("osu_access_token")?.value}`,
        },
      })
      .then((res) => res.data);

    if (!data) {
      return [];
    }

    const packsPromises = data.beatmap_packs.map(async (pack: any) => {
      const packData = await axios
        .get(`https://osu.ppy.sh/api/v2/beatmaps/packs/${pack.tag}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookieStore.get("osu_access_token")?.value}`,
          },
        })
        .then((res) => res.data)
        .catch((e) => { throw e }); // do nothing, because most of the time it's just timeout error

      if (!packData)
        return [];
      if (packData?.beatmapsets?.length !== 0)
        await checkSongCover(packData.beatmapsets[0]);

      return {
        id: pack.tag.toString(),
        author: pack.author,
        title: pack.name,
        thumbnail: packData.beatmapsets[0].covers.cover,
      };
    });

    const packs = await Promise.all(packsPromises);

    return packs;
  } catch (err) {
    console.error(err);
    return [];
  }
}
