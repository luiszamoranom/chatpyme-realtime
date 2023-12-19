import "./App.css";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Medicos from "./components/Medicos";
import Auxiliares from "./components/Auxiliares";
import Examenes from "./components/Examenes";
import Admision from "./components/Admision";
import Pabellon from "./components/Pabellon";
import Administrador from "./components/Administrador";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/admin" element={<Administrador />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/auxiliares" element={<Auxiliares />} />
          <Route path="/examenes" element={<Examenes />} />
          <Route path="/admision" element={<Admision />} />
          <Route path="/pabellon" element={<Pabellon />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
