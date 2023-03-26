import cl from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";
import { Checkmark } from "@/components";

const VoiceToast = () => {
  const { commandText } = useContext(SpeechRecognitionContext);
  const [showToast, setShowToast] = useState(false);
  const [toastCommandText, setToastCommandText] = useState("");

  useEffect(() => {
    console.log(commandText);
    if (commandText) {
      setShowToast(true);
      setToastCommandText(commandText);
      return;
    }

    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  }, [commandText]);

  return (
    <>
      <div className={`${cl.voiceToast} ${!showToast ? cl.hidden : ""}`}>
        {/* <Checkmark /> */}
        <div className={cl.voiceToast__text}>{toastCommandText}</div>
      </div>
    </>
  );
};

export default VoiceToast;
