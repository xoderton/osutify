use std::sync::{Arc, Mutex};

use tauri::Listener;
use serde::{Deserialize, Serialize};
use discord_rich_presence::{activity::{self, Assets}, DiscordIpc, DiscordIpcClient};

#[derive(Serialize, Deserialize)]
struct RichPresencePayload {
  // * "play", "pause", "stop"
  action: String,
  artist: Option<String>,
  title: Option<String>,
  image: Option<String>,
  beatmap: Option<String>,
  duration: Option<i64>,
  seek: Option<i64>
}

#[derive(Serialize, Deserialize)]
struct Payload {
  id: String,
  rpc: Option<RichPresencePayload>
}

fn create_ipc() -> DiscordIpcClient {
  let mut client = DiscordIpcClient::new("1272997790623989760").unwrap();
  client.connect().unwrap();
  client.set_activity(activity::Activity::new()
    .assets(Assets::new()
      .large_image("icon-alt"))
    .details("Chilling...")).unwrap();

  return client;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let client = Arc::new(Mutex::new(create_ipc()));

  tauri::Builder::default()
    .setup(move |app| {
      app.listen("tauri", move |event| {
        let payload = event.payload();
        let data: Payload = serde_json::from_str(payload).unwrap();

        if data.id == "rich_presence" {
          let rpc = data.rpc.unwrap();

          if rpc.action == "play" {
            let image = &rpc.image.unwrap();
            let artist = &rpc.artist.unwrap();
            let title = &rpc.title.unwrap();
            let beatmap = &rpc.beatmap.unwrap();
            let duration = rpc.duration.unwrap();
            let seek = rpc.seek.unwrap();

            let mut buttons: Vec<activity::Button> = Vec::new();
            buttons.push(activity::Button::new("Beatmap", beatmap));

            let start = chrono::offset::Utc::now().timestamp_millis() - (seek * 1000);
            let end = start + duration;

            client.lock().unwrap()
              .set_activity(activity::Activity::new()
                .assets(activity::Assets::new()
                  .large_image(image))
                .timestamps(activity::Timestamps::new()
                  .start(start)
                  .end(end))
                .buttons(buttons)
                .state(artist)
                .details(title)).expect("Activity couldn't be updated");
          }
        }
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
