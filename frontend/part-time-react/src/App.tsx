import { Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
