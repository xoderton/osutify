"use client";

import { useEffect, useState } from "react";

export function Greeting() {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const greetings = [ "night", "morning", "afternoon", "evening" ];

    setGreeting("Good " + greetings[Math.floor(date.getHours() / 6)]);
  }, []);

  return (
    <h1 className="text-white text-3xl font-semibold">
      {greeting || "Loading..."}
    </h1>
  );
}
