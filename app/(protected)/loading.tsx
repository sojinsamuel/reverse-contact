import React from "react";
import ProgressBar from "../ui/progress-bar";
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ProgressBar />
    </div>
  );
}
