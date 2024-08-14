"use client";

import { useEffect, useState } from "react";

const greetings = ["Good night!", "Good morning!", "Good afternoon!", "Good evening!"];

export function Greeting() {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    setGreeting(greetings[Math.floor(new Date().getHours() / 6)]);
  }, []);

  return (
    <h1 className="text-white text-3xl font-semibold">
      {greeting || "Loading..."}
    </h1>
  );
}
