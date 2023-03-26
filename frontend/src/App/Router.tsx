import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/video/*" element={<Home />} />
        <Route path="/*" element={<Navigate to="/video" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
