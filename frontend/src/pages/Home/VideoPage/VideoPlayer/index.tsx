import cl from "./styles.module.scss";
import React, { useEffect, useRef, useState } from "react";
import PubSub from "pubsub-js";
import { IVoicePlayerCommand } from "@/providers/IVoicePlayerCommand";
import testVideo from "./testVideo.mp4";

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const [timelineStyle, setTimelineStyle] = useState<React.CSSProperties>({});
  const player = useRef<HTMLVideoElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const fullscreenObject = useRef<HTMLDivElement>(null);

  // player
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

    return () => {
      PubSub.unsubscribe("voicePlayerCommand");
    };
  });

  // overlay

  const handleTimelineUpdate = () => {
    const progress = player.current!.currentTime / player.current!.duration;
    setTimelineStyle((prev) => ({
      ...prev,
      "--progress-position": progress,
    }));
  };

  const handleMouseMove = (e: any) => {
    // --preview-position
    const previewPosition = e.offsetX / e.srcElement.offsetWidth;
    setTimelineStyle((prev) => ({
      ...prev,
      "--preview-position": previewPosition,
    }));
  };

  const handleTimelineClick = (e: any) => {
    const timelineWidth = e.srcElement.offsetWidth;
    const clickPosition = e.offsetX;
    const clickPositionInPercent = clickPosition / timelineWidth;
    player.current!.currentTime =
      clickPositionInPercent * player.current!.duration;
  };

  useEffect(() => {
    player.current!.addEventListener("timeupdate", handleTimelineUpdate);

    timeline.current!.addEventListener("click", handleTimelineClick);
    timeline.current!.addEventListener("mousemove", handleMouseMove);

    return () => {
      player.current!.removeEventListener("timeupdate", handleTimelineUpdate);
      timeline.current!.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={fullscreenObject} className={cl.videoWrapper}>
      <div className={cl.overlay}>
        <div className={cl.timelineContainer}>
          <div className={cl.timeline} style={timelineStyle} ref={timeline}>
            <div className={cl.thumbIndicator}></div>
          </div>
        </div>
      </div>
      <video className={cl.video} ref={player} loop autoPlay muted>
        <source src={testVideo} />
      </video>
    </div>
  );
};

export default VideoPlayer;
