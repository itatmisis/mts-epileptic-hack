import { WithBlur } from "@/components";
import { useRef } from "react";
import cl from "./styles.module.scss";

const videoSampleDimensions = {
  videoWidth: 720,
  videoHeight: 320,
};

const VideoPage = () => {
  const player = useRef<any>();
  const requestFullScreen = () => {
    const elem = player.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };
  return (
    <div className={cl.sampleReactangle}>
      <div className={cl.sampleReactangle__content}>
        <div ref={player} className={cl.sampleReactangle__content__video}>
          <WithBlur
            originalWidth={videoSampleDimensions.videoWidth}
            originalHeight={videoSampleDimensions.videoHeight}
            blurRegions={[
              {
                x: 300,
                y: 40,
                height: 600,
                width: 600,
              },
              {
                x: 100,
                y: 100,
                height: 100,
                width: 150,
              },
            ]}
          >
            <video
              className={cl.video}
              controls
              width={videoSampleDimensions.videoWidth}
              height={videoSampleDimensions.videoHeight}
            >
              {/* <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/2/22/Volcano_Lava_Sample.webm/Volcano_Lava_Sample.webm.360p.webm" /> */}
              <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4" />
            </video>
          </WithBlur>
        </div>
        <button onClick={() => requestFullScreen()}>Full screen</button>
      </div>
    </div>
  );
};

export default VideoPage;
