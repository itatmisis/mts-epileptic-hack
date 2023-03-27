import cl from "./styles.module.scss";
import VideoPlayer from "./VideoPlayer";

const VideoPage = () => {
  return (
    <div className={cl.videoPageWrapper}>
      <div className={cl.videoPage}>
        <div className={cl.videoPage__video}>
          <VideoPlayer source="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4" />
        </div>
        <div className={cl.videoPage__controls}>test</div>
      </div>
    </div>
  );
};

export default VideoPage;
