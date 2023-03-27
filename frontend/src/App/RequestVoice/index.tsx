import cl from "./styles.module.scss";
import { Modal } from "@/components";
import { useContext, useEffect, useState } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";

const RequestVoice = ({ onClose }: { onClose: () => void }) => {
  const speechRecognitionContext = useContext(SpeechRecognitionContext);

  return (
    <Modal
      onClose={onClose}
      isOpen={true}
      title="Голосовой помощник"
      renderContent={(onModalClose: () => void) => (
        <>
          <div className={cl.requiestVoice}>
            <div className={cl.requiestVoice__text}>
              Для удобства работы с приложением, мы рекомендуем включить
              голосового помощника.
            </div>
            <button
              className={cl.requiestVoice__button}
              onClick={() => {
                speechRecognitionContext.startListening();
                onModalClose();
              }}
            >
              Включить
            </button>
          </div>
        </>
      )}
    />
  );
};

export default RequestVoice;
