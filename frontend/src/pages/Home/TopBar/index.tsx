import cl from "./styles.module.scss";
import { ReactComponent as LogoFull } from "./assets/icons/kion_full.svg";
import { ReactComponent as User } from "./assets/icons/user.svg";

const TopBar = () => {
  return (
    <div className={cl.nav__wrapper}>
      <div className={cl.nav}>
        <LogoFull className={cl.nav__logo} />
        <div className={cl.nav__right}>
          <div className={cl.profile}>
            <User className={cl.profile__avatar} />
            <span className={cl.profile__text}>войти</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
