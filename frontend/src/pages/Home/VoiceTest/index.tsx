import React from "react";
import { useContext, useEffect } from "react";
import { SpeechRecognitionContext } from "@/providers/SpeechRecognition";
import PubSub from "pubsub-js";

const VoiceTest = () => {
  const speechRecognitionContext = useContext(SpeechRecognitionContext);

  useEffect(() => {
    PubSub.subscribe("voiceCommand", (msg, data) => {
      console.log(msg, data);
    });

    return () => {
      PubSub.unsubscribe("voiceCommand");
    };
  }, []);
  return (
    <>
      <div>Transcript: {speechRecognitionContext.transcript}</div>
      <div>Command text: {speechRecognitionContext.commandText}</div>
      <button onClick={() => speechRecognitionContext.startListening}>
        Start listening
      </button>
      <button onClick={speechRecognitionContext.stopListening}>
        Stop listening
      </button>
    </>
  );
};

export default VoiceTest;
