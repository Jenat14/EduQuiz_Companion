import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Subject from "./pages/Subject";
import LevelPage from "./pages/LevelPage";
import Leaderboard from "./pages/Leaderboard";
import LoginStudent from "./pages/loginS";
import StudentSub from "./pages/StudentSub"
function App() {
  return (
    <Router>
      <NavBar /> {/* Render NavBar component */}
      <div style={{ marginTop: "70px", padding: "20px" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginStudent" element={<LoginStudent />} />
        <Route path="/Subject" element={<Subject />} />
        <Route path="/levelPage" element={<LevelPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/StudentSub" element={<StudentSub />} />
      </Routes>
      </div>
    </Router>
 )
}
export default App;