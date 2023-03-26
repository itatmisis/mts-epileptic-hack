import cl from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";
import { Checkmark } from "@/components";

const VoiceToast = () => {
  const { commandText } = useContext(SpeechRecognitionContext);
  const [showToast, setShowToast] = useState(false);
  const [closingToast, setClosingToast] = useState(false);
  const [toastCommandText, setToastCommandText] = useState("");

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
    }, 2500);
  }, [commandText]);

  return (
    <>
      <div
        className={`${cl.voiceToast} ${!showToast ? cl.hidden : ""} ${
          closingToast ? cl.closing : ""
        }`}
      >
        {/* <Checkmark /> */}
        <div className={cl.voiceToast__body}>
          <div className={cl.voiceToast__text}>{toastCommandText}</div>
          <div className={cl.voiceToast__checkmarkWrapper}>
            {closingToast && <Checkmark />}
          </div>
        </div>
        {closingToast && <div className={cl.voiceToast__progress}></div>}
      </div>
    </>
  );
};

export default VoiceToast;
