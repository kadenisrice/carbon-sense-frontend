import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import LandingPage from "./Components/LandingPage/LandingPage";
import CarbonEmission from "./Components/CarbonEmission/CarbonEmission";
import Challenges from "./Components/Challenges/Challenges";
import Friends from "./Components/Friends/Friends";
import Badges from "./Components/Badges/Badges";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/carbon-emission" element={<CarbonEmission />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/badges" element={<Badges />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
