import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Subject from "./pages/Subject";
import LevelPage from "./pages/LevelPage";
import Leaderboard from "./pages/Leaderboard";
function App() {
  return (
    <Router>
      <NavBar /> {/* Render NavBar component */}
      <div style={{ marginTop: "70px", padding: "20px" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Subject" element={<Subject />} />
        <Route path="/levelPage" element={<LevelPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      </div>
    </Router>
 )
}
export default App;