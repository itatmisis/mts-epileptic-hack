import { Outlet, Route, Routes } from "react-router-dom";
import { Modal } from "@/components";
import VoiceTest from "./VoiceTest";
import TopBar from "./TopBar";
import VideoPage from "./VideoPage";

const Home = () => {
  return (
    <>
      <header>
        <TopBar />
      </header>
      <main
        id="main-content"
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <Routes>
          <Route index element={<VideoPage />} />
          <Route path="test" element={<VoiceTest />} />
        </Routes>
        <Outlet />
      </main>
    </>
  );
};

export default Home;
