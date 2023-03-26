import { useContext, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { SpeechRecognitionContext } from "../../providers/SpeechRecognition";
import PubSub from "pubsub-js";
import { Modal } from "@/components";

const Home = () => {
  const speechRecognitionContext = useContext(SpeechRecognitionContext);

  useEffect(() => {
    PubSub.subscribe("voiceCommand", (msg, data) => {
      console.log(msg, data);
    });
  }, []);

  return (
    <>
      <div>Transcript: {speechRecognitionContext?.transcript}</div>
      <div>Command text: {speechRecognitionContext?.commandText}</div>
      <button onClick={speechRecognitionContext?.startListening}>
        Start listening
      </button>
      <button onClick={speechRecognitionContext?.stopListening}>
        Stop listening
      </button>
      <Modal
        isOpen={true}
        onClose={() => {}}
        renderContent={() => <h1>Modal content</h1>}
      />

      <Routes>
        <Route path="login" element={<h1>Login page</h1>} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Home;
