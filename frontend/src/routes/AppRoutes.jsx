import { Route, Routes } from "react-router-dom";
import Assistant from "../pages/Assistant";
import CropResult from "../pages/CropResult";
import Home from "../pages/Home";
import SchemeResult from "../pages/SchemeResult";
import SoilResult from "../pages/SoilResult";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/scheme" element={<SchemeResult />} />
      <Route path="/crop" element={<CropResult />} />
      <Route path="/soil" element={<SoilResult />} />
    </Routes>
  );
}
