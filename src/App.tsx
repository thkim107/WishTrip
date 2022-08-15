import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import Start from "./pages/Authentication/Start";
import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import Ar from "./pages/Ar/Ar";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="WishTrip" element={<Start />} />
        <Route path="WishTrip/Authentication" element={<Authentication />} />
        <Route path="Home" element={<Home />} />
        <Route path="WishTrip/AR" element={<Ar />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
