export async function checkSongCover(song: any) {
  const isAccessable = await checkIfAccessable(song.covers.cover) == 200;
  if (!isAccessable)
    song.covers.cover = `https://osu.ppy.sh/assets/images/default-bg.7594e945.png`;
}

async function checkIfAccessable(url: string) {
  let isAccessable = -1

  await fetch(url)
    .then((res) => isAccessable = res.status)
    .catch(() => isAccessable = 408)

  return isAccessable
}
