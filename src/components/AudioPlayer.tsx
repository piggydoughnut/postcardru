import React, { useRef } from "react";

const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef(null);

  return (
    <div>
      <audio ref={audioRef} controls autoPlay>
        <source src={src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
