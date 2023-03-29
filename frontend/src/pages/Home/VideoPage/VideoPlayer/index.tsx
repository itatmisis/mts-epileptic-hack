import cl from "./styles.module.scss";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import PubSub from "pubsub-js";
import { IVoicePlayerCommand } from "@/providers/IVoicePlayerCommand";
import testVideo from "./testVideo.mp4";
import { ReactComponent as PlayIcon } from "./assets/play.svg";
import { ReactComponent as PauseIcon } from "./assets/pause.svg";
import { ReactComponent as FullscreenIcon } from "./assets/fullscreen.svg";
import { ReactComponent as Forward10Icon } from "./assets/forward10.svg";
import { ReactComponent as Backward10Icon } from "./assets/backward10.svg";
import { ReactComponent as VolumeMuteIcon } from "./assets/volume_mute.svg";
import { ReactComponent as VolumeLowIcon } from "./assets/volume_low.svg";
import { ReactComponent as VolumeHighIcon } from "./assets/volume_high.svg";
import { ReactComponent as AccessibilityIcon } from "./assets/accessibility.svg";

import { Modal, Slider, WithBlur } from "@/components";
import AccessibilityControls from "./AccessibilityControls";

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const [isAccessibilityPopupOpen, setIsAccessibilityPopupOpen] =
    useState(false);
  const [duration, setDuration] = useState("0:00 / 0:00");
  const [videoHeight, setVideoHeight] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [videoWidth, setVideoWidth] = useState(0);
  const player = useRef<HTMLVideoElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const fullscreenObject = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [daltonism, setDaltonism] = useState("none");

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

  const handleCommand = (data: IVoicePlayerCommand) => {
    console.log(data);
    const command = data.command;
    switch (command) {
      case "pausePlay":
        handlePausePlay();
        break;
      case "volume":
        if (data.value) {
          if (data.append) appendVolume(data.value);
          else setVolume(data.value);
        }
        break;
      case "fullscreen":
        handleFullscreen();
        break;
    }
  };

  const appendTime = (time: number) => {
    player.current!.currentTime += time;
  };

  const setTime = (time: number) => {
    player.current!.currentTime = time;
  };

  const appendVolume = (volume: number) => {
    setVolume((prev) => (prev += volume));
  };

  // voice commands
  useEffect(() => {
    let pubsubToken = PubSub.subscribe("voicePlayerCommand", (msg, data) =>
      handleCommand(data)
    );

    return () => {
      PubSub.unsubscribe(pubsubToken);
    };
  });

  // volume update
  useEffect(() => {
    player.current!.volume = volume;
  }, [volume]);

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

    updateDuration();
  };

  const updateDuration = () => {
    const currentTime = player.current!.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime - minutes * 60);
    const totalMinutes = Math.floor(player.current!.duration / 60);
    const totalSeconds = Math.floor(
      player.current!.duration - totalMinutes * 60
    );
    setDuration(
      `${minutes}:${seconds < 10 ? "0" + seconds : seconds} / ${totalMinutes}:${
        totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
      }`
    );
  };

  useEffect(() => {
    player.current!.addEventListener("timeupdate", handleTimeUpdate);
    player.current!.addEventListener("loadedmetadata", () => {
      setVideoHeight(player.current!.videoHeight);
      setVideoWidth(player.current!.videoWidth);
      updateDuration();
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
        screen.orientation
          .lock("landscape-primary")
          .then(function () {
            // alert("Locked");
          })
          .catch(function (error) {
            // alert(error);
          });
      } else {
        setIsFullscreen(false);
      }
    });

    return () => {
      // player.current!.removeEventListener("timeupdate", handleTimeUpdate);
      // player.current!.removeEventListener("loadedmetadata", () => {
      //   setVideoHeight(player.current!.videoHeight);
      //   setVideoWidth(player.current!.videoWidth);
      //   updateDuration();
      // });
      // player.current!.removeEventListener("pause", () => {
      //   setIsPaused(true);
      // });
      // player.current!.removeEventListener("play", () => {
      //   setIsPaused(false);
      // });

      // timeline.current!.removeEventListener("click", handleTimelineUpdate);
      // timeline.current!.removeEventListener("mousemove", handlePreviewPosition);
      // timeline.current!.removeEventListener("mousedown", handleScrubbing);

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
    <>
      <div
        ref={fullscreenObject}
        id="videoWrapper"
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
              <button
                className={cl.playbackButton}
                onClick={() => {
                  appendTime(-10);
                }}
              >
                <Backward10Icon />
              </button>
              <button
                className={cl.playbackButton}
                onClick={() => {
                  appendTime(10);
                }}
              >
                <Forward10Icon />
              </button>
              <div className={cl.volumeContainer} tabIndex={0}>
                <button
                  className={cl.volumeButton}
                  onClick={() => {
                    setVolume(volume === 0 ? 0.5 : 0);
                  }}
                >
                  {volume === 0 ? (
                    <VolumeMuteIcon />
                  ) : volume < 0.5 ? (
                    <VolumeLowIcon />
                  ) : (
                    <VolumeHighIcon />
                  )}
                </button>
                <Slider
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                  }}
                />
              </div>
              <div className={cl.durationContainer}>
                <span className={cl.duration}>{duration}</span>
              </div>
            </div>
            <div className={cl.right}>
              <button
                className={cl.playbackButton}
                onClick={(e) => {
                  e.stopPropagation(),
                    setIsAccessibilityPopupOpen((prev) => !prev);
                }}
              >
                <AccessibilityIcon />
              </button>
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
                x: 500,
                y: 250,
                width: 200,
                height: 200,
              },
              {
                x: 900,
                y: 150,
                width: 300,
                height: 400,
              },
            ]}
            // get original width and height of the video
            originalHeight={videoHeight}
            originalWidth={videoWidth}
          >
            <video
              style={{
                filter: `contrast(${contrast}) saturate(${saturation}) brightness(${brightness})`,
              }}
              className={`${cl.player} ${cl.deutranopiaFilter}`}
              ref={player}
              loop
              autoPlay
            >
              <source src={testVideo} />
            </video>
          </WithBlur>
        </div>
        {isAccessibilityPopupOpen && (
          <div className={cl.accessibilityControlsDesktop}>
            <AccessibilityControls
              onClose={() => setIsAccessibilityPopupOpen(false)}
              saturation={saturation}
              contrast={contrast}
              brightness={brightness}
              setSaturation={setSaturation}
              setContrast={setContrast}
              setBrightness={setBrightness}
              setDaltonism={setDaltonism}
            />
          </div>
        )}
      </div>
      <div className={cl.accessibilityControlsMobile}>
        <Modal
          isOpen={isAccessibilityPopupOpen}
          onClose={() => setIsAccessibilityPopupOpen(false)}
          title="Доступность"
          renderContent={(onClose) => (
            <AccessibilityControls
              onClose={onClose}
              saturation={saturation}
              contrast={contrast}
              brightness={brightness}
              setSaturation={setSaturation}
              setContrast={setContrast}
              setBrightness={setBrightness}
              setDaltonism={setDaltonism}
            />
          )}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
