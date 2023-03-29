// the script raises pubsub "voiceCommand" event on voice command after the word "плеер" is recognized
// publishes an array of keyword words (for example: ["перейти", "в", "сериалы"])

import { createContext, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import debounce from "../utils/debounce";
import PubSub from "pubsub-js";
import { IVoicePlayerCommand } from "./IVoicePlayerCommand";
import { IVoiceCommand } from "./IVoiceCommand";

interface SpeechRecognitionContextType {
  transcript: string;
  commandText: string;
  listening: boolean;
  browserSupportsSpeechRecognition: boolean;
  startListening: (isOnce?: boolean) => void;
  stopListening: () => void;
}

export const SpeechRecognitionContext =
  createContext<SpeechRecognitionContextType>(null as any);

export const SpeechRecognitionProvider = ({ children }: { children: any }) => {
  const [commandText, setCommandText] = useState("");
  const commands = [
    {
      command: ["плеер *", "player *"],
      callback: handleCommand,
      matchInterim: true,
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const commandDebouncer = debounce((text: string) => {
    notifyCustomCommands(text);
    resetTranscript();
  }, 1000);

  function handleCommand(text: string) {
    setCommandText(text);
    commandDebouncer(text);
  }

  async function notifyCustomCommands(text: string) {
    // `http://91.185.84.103/api/v1/voice?input=${text}`
    const response = await fetch(
      `http://91.185.84.103:8080/api/v1/voice/${text}`
    );
    const recognizedData = await response.json();
    console.log(recognizedData);
    PubSub.publish("voicePlayerCommand", {
      action: recognizedData.action,
      descriptor: recognizedData.descriptor,
      value: recognizedData.value,
    } as IVoiceCommand);
    setCommandText("");
  }

  const startListening = (isOnce = false) => {
    SpeechRecognition.startListening({
      language: "ru-RU",
      continuous: !isOnce,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

  return (
    <SpeechRecognitionContext.Provider
      value={{
        transcript,
        commandText,
        listening,
        browserSupportsSpeechRecognition,
        startListening,
        stopListening,
      }}
    >
      {children}
    </SpeechRecognitionContext.Provider>
  );
};
