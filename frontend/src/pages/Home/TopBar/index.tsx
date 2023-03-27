import cl from "./styles.module.scss";
import { ReactComponent as LogoFull } from "./assets/icons/kion_full.svg";
import { ReactComponent as UserIcon } from "./assets/icons/user.svg";
import { ReactComponent as VoiceIcon } from "@/assets/icons/voice.svg";
import { useContext } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";
import { WithTooltip } from "@/components";

const TopBar = () => {
  const {
    listening,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  } = useContext(SpeechRecognitionContext);

  return (
    <nav className={cl.nav__wrapper}>
      <div className={cl.nav}>
        <LogoFull className={cl.nav__logo} />
        <a href="#main-content" className={cl.nav__skipLink}>
          Пропустить навигацию
        </a>
        <div className={cl.nav__right}>
          <div className={`${cl.voiceStatus} ${listening ? cl.active : ""}`}>
            <WithTooltip
              tooltip={
                window.navigator.userAgent.includes("Android") ||
                !browserSupportsSpeechRecognition
                  ? "Голосовое управление не поддерживается"
                  : listening
                  ? "Голосовое управление включено"
                  : "Голосовое управление выключено"
              }
              onClick={() => {
                console.log("test");
                listening ? stopListening() : startListening();
              }}
            >
              <VoiceIcon className={cl.voiceStatus__icon} />
            </WithTooltip>
          </div>
          <div tabIndex={0} className={cl.profile}>
            <UserIcon className={cl.profile__avatar} />
            <span className={cl.profile__text}>войти</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
