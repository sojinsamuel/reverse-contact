"use client";
import { useEffect, useState } from "react";
import { Progress } from "@nextui-org/react";

export default function ProgressBar() {
  const [value, setValue] = useState(0);

  return <p>Loading...</p>;

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      aria-label="Loading..."
      size="md"
      value={value}
      color="success"
      showValueLabel={true}
      className="max-w-md"
    />
  );
}
