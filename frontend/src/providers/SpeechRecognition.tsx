// the script raises pubsub "voiceCommand" event on voice command after the word "плеер" is recognized
// publishes an array of keyword words (for example: ["перейти", "в", "сериалы"])

import { createContext, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import debounce from "../utils/debounce";
import PubSub from "pubsub-js";

interface SpeechRecognitionContextType {
  transcript: string;
  commandText: string;
  listening: boolean;
  browserSupportsSpeechRecognition: boolean;
  startListening: () => void;
  stopListening: () => void;
}

export const SpeechRecognitionContext =
  createContext<SpeechRecognitionContextType | null>(null);

export const SpeechRecognitionProvider = ({ children }: { children: any }) => {
  const [commandText, setCommandText] = useState("");
  const commands = [
    {
      command: ["плеер *"],
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

  function notifyCustomCommands(text: string) {
    PubSub.publish("voiceCommand", text.split(" "));
    setCommandText("");
  }

  const startListening = () => {
    SpeechRecognition.startListening({ language: "ru-RU", continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

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
