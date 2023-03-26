import Routes from "./Router";
import Providers from "@/providers";
import "@/styles/base.scss";

import { lazy } from "react";
const VoiceToast = lazy(() => import("@/components/VoiceToast"));

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
