import { Outlet, Route, Routes } from "react-router-dom";
import { Modal } from "@/components";
import VoiceTest from "./VoiceTest";
import OldVideoPage from "./OldVideoPage";
import TopBar from "./TopBar";

const Home = () => {
  return (
    <>
      <header>
        <TopBar />
      </header>
      <main id="main-content" style={{ height: "100%" }}>
        <Routes>
          <Route path="test" element={<VoiceTest />} />
          <Route path="video" element={<OldVideoPage />} />
        </Routes>
        <Outlet />
      </main>
    </>
  );
};

export default Home;
