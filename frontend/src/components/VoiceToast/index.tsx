import cl from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";
import { Checkmark } from "@/components";
import { ReactComponent as ErrorIcon } from "./assets/error.svg";
import PubSub from "pubsub-js";
import { IVoiceCommand } from "@/providers/IVoiceCommand";

const VoiceToast = () => {
  const { commandText } = useContext(SpeechRecognitionContext);
  const [showToast, setShowToast] = useState(false);
  const [closingToast, setClosingToast] = useState(false);
  const [commandNotRecognized, setCommandNotRecognized] = useState(false);
  const [toastCommandText, setToastCommandText] = useState(
    "тестирование ввода текста"
  );
  const [commandType, setCommandType] = useState("распознавание...");

  useEffect(() => {
    if (commandText) {
      setShowToast(true);
      setToastCommandText(commandText);
      setClosingToast(false);
      return;
    }

    setClosingToast(true);
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => {
        setCommandType("распознавание...");
        setCommandNotRecognized(false);
      }, 500);
    }, 2500);
  }, [commandText]);

  useEffect(() => {
    let pubsubToken = PubSub.subscribe(
      "voicePlayerCommand",
      (message, data: IVoiceCommand) => {
        const textMap = {
          volume_up: "Громкость увеличена",
          volume_down: "Громкость уменьшена",
          brightness_up: "Яркость увеличена",
          brightness_down: "Яркость уменьшена",
          contrast_up: "Контрастность увеличена",
          contrast_down: "Контрастность уменьшена",
          saturation_up: "Насыщенность увеличена",
          saturation_down: "Насыщеноть уменьшена",
          "pause/play": "Изменение проигрывания",
          skip: "Перемотка видео",
          trash: "Неизвестная команда",
        };
        setCommandNotRecognized(data.action == "trash");
        setCommandType(textMap[data.action]);
      }
    );

    return () => {
      PubSub.unsubscribe(pubsubToken);
    };
  }, []);

  return (
    <>
      <div
        className={`${cl.voiceToast} ${!showToast ? cl.hidden : ""} ${
          closingToast ? cl.closing : ""
        }`}
      >
        {/* <Checkmark /> */}
        <div className={cl.voiceToast__content}>
          <div className={cl.voiceToast__text}>
            <div
              className={`${cl.voiceToast__commandType} ${
                commandType != "распознавание..." && cl.detected
              }`}
            >
              {commandType}
            </div>
            <p className={cl.voiceText__commandText}>{toastCommandText}</p>
          </div>
          <div className={cl.voiceToast__checkmarkWrapper}>
            {closingToast && commandNotRecognized ? (
              <ErrorIcon style={{ color: "var(--primary)" }} />
            ) : (
              <Checkmark />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceToast;
