import cl from "./styles.module.scss";
import { ReactComponent as LogoFull } from "./assets/icons/kion_full.svg";
import { ReactComponent as User } from "./assets/icons/user.svg";

const TopBar = () => {
  return (
    <div className={cl.nav__wrapper}>
      <div className={cl.nav}>
        <LogoFull className={cl.nav__logo} />
        <h1>TopBar</h1>
        <div className={cl.nav__right}>
          <div className={cl.right__profile}>
            <User className={cl.profile__avatar} />
            <span>профиль</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
