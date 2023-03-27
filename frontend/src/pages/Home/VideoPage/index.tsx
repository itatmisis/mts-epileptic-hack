import cl from "./styles.module.scss";
import VideoPlayer from "./VideoPlayer";

const VideoPage = () => {
  return (
    <div className={cl.videoPageWrapper}>
      <div className={cl.videoPage}>
        <div className={cl.videoPage__video}>
          <VideoPlayer />
        </div>
        <div className={cl.videoPage__controls}>test</div>
      </div>
    </div>
  );
};

export default VideoPage;
