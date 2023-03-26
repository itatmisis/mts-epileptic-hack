import Routes from "./Router";
import Providers from "../providers";

import "../styles/base.scss";
import { VoiceToast } from "@/components";

function App() {
  return (
    <>
      <Providers>
        <VoiceToast />
        <Routes />
      </Providers>
    </>
  );
}

export default App;
