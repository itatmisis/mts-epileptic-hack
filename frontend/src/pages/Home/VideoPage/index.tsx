import { WithBlur } from "@/components";
import cl from "./styles.module.scss";

const videoSampleDimensions = {
  videoWidth: 720,
  videoHeight: 320,
};

const VideoPage = () => {
  return (
    <div className={cl.sampleReactangle}>
      <div className={cl.sampleReactangle__content}>
        <div className={cl.sampleReactangle__content__video}>
          <WithBlur
            originalWidth={videoSampleDimensions.videoWidth}
            originalHeight={videoSampleDimensions.videoHeight}
            blurRegions={[
              {
                x: 300,
                y: 40,
                height: 200,
                width: 200,
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
              width={videoSampleDimensions.videoWidth}
              height={videoSampleDimensions.videoHeight}
            >
              <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/2/22/Volcano_Lava_Sample.webm/Volcano_Lava_Sample.webm.360p.webm" />
            </video>
          </WithBlur>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
