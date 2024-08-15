export interface Song {
  id: string;
  author: string;
  creator: string; // of the beatmap
  title: string;
  song_url: string;
  thumbnail: string;
}

export interface Pack {
  id: string;
  author: string; // of the pack
  title: string;
  thumbnail: string;
}
