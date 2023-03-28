import cl from "./styles.module.scss";
import React, { useEffect, useRef, useState } from "react";
import PubSub from "pubsub-js";
import { IVoicePlayerCommand } from "@/providers/IVoicePlayerCommand";
import testVideo from "./testVideo.mp4";
import { ReactComponent as PlayIcon } from "./assets/play.svg";
import { ReactComponent as PauseIcon } from "./assets/pause.svg";

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
  let isScrubbing = false;
  let wasPlaying = false;

  const handleScrubbing = (e: any) => {
    if (e.type === "mousedown") {
      isScrubbing = true;
      wasPlaying = !player.current!.paused;
      player.current!.pause();
    }

    if (e.type === "mouseup") {
      isScrubbing = false;
      if (wasPlaying) {
        player.current!.play();
      }
    }
  };

  const handlePreviewPosition = (e: any) => {
    const previewPosition = e.offsetX / e.srcElement.offsetWidth;
    timeline.current?.style.setProperty(
      "--preview-position",
      previewPosition.toString()
    );
  };

  const handleTimelineUpdate = (e: any) => {
    const timelineWidth = e.srcElement.offsetWidth;
    console.log(e, timelineWidth);
    const clickPosition = e.offsetX;
    const clickPositionInPercent = clickPosition / timelineWidth;
    player.current!.currentTime =
      clickPositionInPercent * player.current!.duration;
    const progress = player.current!.currentTime / player.current!.duration;
    setTimelineStyle((prev) => ({
      ...prev,
      "--progress-position": progress,
    }));
    timeline.current?.style.setProperty(
      "--progress-position",
      progress.toString()
    );
  };

  const handleTimeUpdate = (e: any) => {
    const progress = player.current!.currentTime / player.current!.duration;
    setTimelineStyle((prev) => ({
      ...prev,
      "--progress-position": progress,
    }));
    timeline.current?.style.setProperty(
      "--progress-position",
      progress.toString()
    );
  };

  useEffect(() => {
    player.current!.addEventListener("timeupdate", handleTimeUpdate);

    timeline.current!.addEventListener("mousedown", handleScrubbing);
    document.addEventListener("mouseup", (e) => {
      if (isScrubbing) handleScrubbing(e);
    });
    document.addEventListener("mousemove", (e) => {
      if (isScrubbing) handleTimelineUpdate(e);
    });
    timeline.current!.addEventListener("mousemove", handlePreviewPosition);

    return () => {
      player.current!.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div ref={fullscreenObject} className={cl.videoWrapper}>
      <div className={cl.overlay}>
        <div className={cl.timelineContainer}>
          <div className={cl.timeline} ref={timeline}>
            <div className={cl.thumbIndicator}></div>
          </div>
        </div>
        <div className={cl.playbackControls}>
          <button
            className={`${cl.playbackButton} ${cl.play}`}
            onClick={handlePausePlay}
          >
            {player.current?.paused ? (
              <PlayIcon className={cl.playIcon} />
            ) : (
              <PauseIcon className={cl.playIcon} />
            )}
          </button>
        </div>
      </div>
      <video className={cl.video} ref={player} loop autoPlay muted>
        <source src={testVideo} />
      </video>
    </div>
  );
};

export default VideoPlayer;
