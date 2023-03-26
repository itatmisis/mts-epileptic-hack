import { SpeechRecognitionProvider } from "./SpeechRecognition";

const Providers = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) => <SpeechRecognitionProvider>{children}</SpeechRecognitionProvider>;

export default Providers;
