"use client";

import { useEffect, useState } from "react";

function getTime() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

export default function Clock() {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      suppressHydrationWarning
      className="text-sm text-[var(--muted)] tabular-nums bg-[var(--background)] px-1"
    >
      {time}
    </span>
  );
}
