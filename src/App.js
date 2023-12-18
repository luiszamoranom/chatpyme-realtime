import "./App.css";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Medicos from "./components/Medicos";
import Auxiliares from "./components/Auxiliares";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/auxiliares" element={<Auxiliares />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
