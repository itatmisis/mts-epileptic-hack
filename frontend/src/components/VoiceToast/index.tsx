import cl from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";
import { Checkmark } from "@/components";
import PubSub from "pubsub-js";

const VoiceToast = () => {
  const { commandText } = useContext(SpeechRecognitionContext);
  const [showToast, setShowToast] = useState(false);
  const [closingToast, setClosingToast] = useState(false);
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
      }, 500);
    }, 2500);
  }, [commandText]);

  useEffect(() => {
    let pubsubToken = PubSub.subscribe(
      "voicePlayerCommand",
      (message, data) => {
        console.log(data);
        switch (data.command) {
          case "pausePlay":
            setCommandType("Продолжаем видео");
            break;
        }
      }
    );

    return () => {
      PubSub.unsubscribe(pubsubToken);
    };
  }, []);

  useEffect(() => {
    console.log(commandType);
  }, [commandType]);

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
            {closingToast && <Checkmark />}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceToast;
