import cl from "./styles.module.scss";
import React, { useEffect, useRef, useState } from "react";
import PubSub from "pubsub-js";
import { IVoicePlayerCommand } from "@/providers/IVoicePlayerCommand";
import testVideo from "./testVideo.mp4";
import { ReactComponent as PlayIcon } from "./assets/play.svg";
import { ReactComponent as PauseIcon } from "./assets/pause.svg";
import { ReactComponent as FullscreenIcon } from "./assets/fullscreen.svg";
import { WithBlur } from "@/components";

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const [duration, setDuration] = useState("");
  const [videoHeight, setVideoHeight] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [videoWidth, setVideoWidth] = useState(0);
  const player = useRef<HTMLVideoElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const fullscreenObject = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // player
  const handleFullscreen = () => {
    // check if already in fulscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
      return;
    }
    if (fullscreenObject.current?.requestFullscreen) {
      fullscreenObject.current?.requestFullscreen();
      setIsFullscreen(true);
    }
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
    const rect = timeline.current!.getBoundingClientRect();
    const clickPositionInPercent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    player.current!.currentTime =
      clickPositionInPercent * player.current!.duration;
    const progress = player.current!.currentTime / player.current!.duration;
    timeline.current?.style.setProperty(
      "--progress-position",
      progress.toString()
    );
  };

  const handleTimeUpdate = (e: any) => {
    const progress = player.current!.currentTime / player.current!.duration;
    timeline.current?.style.setProperty(
      "--progress-position",
      progress.toString()
    );

    // format to mm:ss/total
    const currentTime = player.current!.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime - minutes * 60);
    const totalMinutes = Math.floor(player.current!.duration / 60);
    const totalSeconds = Math.floor(
      player.current!.duration - totalMinutes * 60
    );
    setDuration(
      `${minutes}:${seconds < 10 ? "0" + seconds : seconds}/${totalMinutes}:${
        totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
      }`
    );
  };

  useEffect(() => {
    player.current!.addEventListener("timeupdate", handleTimeUpdate);
    player.current!.addEventListener("loadedmetadata", () => {
      setVideoHeight(player.current!.videoHeight);
      setVideoWidth(player.current!.videoWidth);
    });
    player.current!.addEventListener("pause", () => {
      setIsPaused(true);
    });
    player.current!.addEventListener("play", () => {
      setIsPaused(false);
    });

    timeline.current!.addEventListener("click", handleTimelineUpdate);
    timeline.current!.addEventListener("mousemove", handlePreviewPosition);
    timeline.current!.addEventListener("mousedown", handleScrubbing);

    document.addEventListener("mouseup", (e) => {
      if (isScrubbing) handleScrubbing(e);
    });
    document.addEventListener("mousemove", (e) => {
      if (isScrubbing) handleTimelineUpdate(e);
    });
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    });

    return () => {
      player.current!.removeEventListener("timeupdate", handleTimeUpdate);
      player.current!.removeEventListener("loadedmetadata", () => {
        setVideoHeight(player.current!.videoHeight);
        setVideoWidth(player.current!.videoWidth);
      });
      player.current!.removeEventListener("pause", () => {
        setIsPaused(true);
      });
      player.current!.removeEventListener("play", () => {
        setIsPaused(false);
      });

      timeline.current!.removeEventListener("click", handleTimelineUpdate);
      timeline.current!.removeEventListener("mousemove", handlePreviewPosition);
      timeline.current!.removeEventListener("mousedown", handleScrubbing);

      document.removeEventListener("mouseup", (e) => {
        if (isScrubbing) handleScrubbing(e);
      });
      document.removeEventListener("mousemove", (e) => {
        if (isScrubbing) handleTimelineUpdate(e);
      });
      document.removeEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
          setIsFullscreen(true);
        } else {
          setIsFullscreen(false);
        }
      });
    };
  }, []);

  return (
    <div
      ref={fullscreenObject}
      className={cl.videoWrapper}
      onDoubleClick={handleFullscreen}
    >
      <div className={cl.overlay} onClick={(e) => e.preventDefault()}>
        <div className={cl.timelineContainer}>
          <div className={cl.timeline} ref={timeline}>
            <div className={cl.thumbIndicator}></div>
          </div>
        </div>
        <div className={cl.playbackControls}>
          <div className={cl.left}>
            <button
              className={`${cl.playbackButton} ${cl.play}`}
              onClick={handlePausePlay}
            >
              {player.current?.paused ? (
                <PlayIcon style={{ marginLeft: 2 }} />
              ) : (
                <PauseIcon />
              )}
            </button>
            <div className={cl.durationContainer}>
              <span className={cl.duration}>{duration}</span>
            </div>
          </div>
          <div className={cl.right}>
            <button className={cl.playbackButton} onClick={handleFullscreen}>
              <FullscreenIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={cl.playerContainer} onClick={handlePausePlay}>
        <WithBlur
          isFullscreen={isFullscreen}
          blurRegions={[
            {
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            },
          ]}
          // get original width and height of the video
          originalHeight={videoHeight}
          originalWidth={videoWidth}
        >
          <video className={cl.player} ref={player} loop autoPlay muted>
            <source src={testVideo} />
          </video>
        </WithBlur>
      </div>
    </div>
  );
};

export default VideoPlayer;
