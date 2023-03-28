import cl from "./styles.module.scss";
import { ReactComponent as VideoIcon } from "./assets/video.svg";
import { ReactComponent as HomeIcon } from "./assets/home.svg";

const BottomMobileNav = () => {
  return (
    <div className={cl.bottomMobileNav}>
      <div className={cl.bottomMobileNav__item}>
        <div className={cl.bottomMobileNav__icon}>
          <HomeIcon />
        </div>
        <div className={cl.bottomMobileNav__text}>Главная</div>
      </div>
      <div className={cl.bottomMobileNav__item}>
        <div className={cl.bottomMobileNav__icon}>
          <VideoIcon />
        </div>
        <div className={cl.bottomMobileNav__text}>Видео</div>
      </div>
    </div>
  );
};

export default BottomMobileNav;
