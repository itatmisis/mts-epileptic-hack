import Routes from "./Router";
import Providers from "@/providers";
import "@/styles/base.scss";

import { lazy, Suspense, useState } from "react";
const VoiceToast = lazy(() => import("@/components/VoiceToast"));
const RequestVoice = lazy(() => import("./RequestVoice"));

function App() {
  const [showVoiceRequest, setShowVoiceRequest] = useState(true);

  return (
    <>
      <Providers>
        <>
          {showVoiceRequest && (
            <Suspense fallback={<></>}>
              <RequestVoice onClose={() => setShowVoiceRequest(false)} />
            </Suspense>
          )}
        </>
        <VoiceToast />
        <Routes />
      </Providers>
    </>
  );
}

export default App;
