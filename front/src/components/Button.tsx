import {ReactNode} from "react";

export default function Button({
  children,
  audioName
}: {
  children: ReactNode;
  audioName: string;
}) {
  // creates a new audio object and plays it
  const handlePlay = () => {
    const audio = new Audio(`/pronunciation/${audioName}.mp3`);
    audio.play().catch(error => console.error("Audio playback failed:", error));
  };

  return (
    <div className="" onClick={handlePlay}>
      {children}
    </div>
  );
}
