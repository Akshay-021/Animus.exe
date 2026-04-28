import { BrowserRouter, Routes, Route } from "react-router-dom";
import Assistant from "../pages/Assistant";
import SchemeResult from "../pages/SchemeResult";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main page → Voice Assistant */}
        <Route path="/" element={<Assistant />} />

        {/* Optional: keep old page */}
        <Route path="/scheme" element={<SchemeResult />} />
      </Routes>
    </BrowserRouter>
  );
}