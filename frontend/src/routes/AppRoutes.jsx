import { BrowserRouter, Routes, Route } from "react-router-dom";
import SchemeResult from "../pages/SchemeResult";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SchemeResult />} />
      </Routes>
    </BrowserRouter>
  );
}