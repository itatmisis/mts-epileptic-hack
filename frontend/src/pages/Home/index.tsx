import { Outlet, Route, Routes } from "react-router-dom";
import { Modal } from "@/components";
import VoiceTest from "./VoiceTest";
import VideoPlayer from "./VideoPlayer";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="test" element={<VoiceTest />} />
        <Route path="video" element={<VideoPlayer />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Home;
