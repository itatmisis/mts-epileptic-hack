import cl from "./styles.module.scss";
import React, { useEffect, useRef } from "react";
import PubSub from "pubsub-js";
import { IVoicePlayerCommand } from "@/providers/IVoicePlayerCommand";
import testVideo from "./testVideo.mp4";

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const player = useRef<HTMLVideoElement>(null);
  const fullscreenObject = useRef<HTMLDivElement>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    player.current!.volume = +e.target.value;
  };

  const handleFullscreen = () => {
    player.current?.requestFullscreen();
  };

  const handlePausePlay = () => {
    if (player.current!.paused) {
      player.current!.play();
      return;
    }
    player.current!.pause();
  };

  const handleVolume = (volume: number) => {
    player.current!.volume = volume / 100;
  };

  const handleCommand = (data: IVoicePlayerCommand) => {
    console.log(data);
    const command = data.command;
    switch (command) {
      case "pausePlay":
        handlePausePlay();
        break;
      case "volume":
        handleVolume(data.value ?? 0);
        break;
      case "fullscreen":
        handleFullscreen();
        break;
    }
  };

  useEffect(() => {
    PubSub.subscribe("voicePlayerCommand", (msg, data) => handleCommand(data));
  });

  return (
    <div ref={fullscreenObject} className={cl.videoWrapper}>
      <div className={cl.overlay}></div>
      <video className={cl.video} ref={player}>
        <source src={testVideo} />
      </video>
    </div>
  );
};

export default VideoPlayer;
