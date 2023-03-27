import cl from "./styles.module.scss";
import { Modal } from "@/components";
import { useContext, useEffect, useState } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";

const RequestVoice = ({ onClose }: { onClose: () => void }) => {
  const { browserSupportsSpeechRecognition, startListening, listening } =
    useContext(SpeechRecognitionContext);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition || listening) onClose();
  }, []);

  return (
    <Modal
      onClose={onClose}
      isOpen={true}
      title="Голосовой помощник"
      renderContent={(onModalClose: () => void) => (
        <>
          <div className={cl.requestVoice}>
            <div className={cl.requestVoice__body}>
              Для удобства работы рекомендуется использовать голосовые команды.
              Желаете включить?
            </div>
            <div className={cl.requestVoice__buttons}>
              <button
                className={"btn accent"}
                onClick={() => {
                  onModalClose();
                }}
              >
                Нет, спасибо
              </button>
              <button
                className={"btn primary"}
                onClick={() => {
                  startListening();
                  onModalClose();
                }}
              >
                Да, включить
              </button>
            </div>
          </div>
        </>
      )}
    />
  );
};

export default RequestVoice;
