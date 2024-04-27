import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";

import LoginStudent from "./pages/loginS";
import CardPage from "./pages/cardpage";
import StudentSub from "./pages/StudentSub";
import Question from "./pages/Question";
import Result from "./pages/Result";

import Facultylogin from "./pages/Facultylogin";
import Facultydash from "./pages/facultydash";
import Subject from "./pages/Subject";
import LevelPage from "./pages/LevelPage";
import LeadView from "./pages/LeadView";
import Leaderboard from "./pages/Leaderboard";
import PageLayout from "./pages/PageLayout";
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*Student Interface*/}
        <Route path="/LoginStudent" element={<LoginStudent />} />
        <Route path="/CardPage" element={<><NavBar/><CardPage /></>} />
        <Route path="/StudentSub" element={<><NavBar/><StudentSub /></>} />
        <Route path="/Question" element={<Question/>}/>
        <Route path="/Result" element={<><NavBar/><Result /></>} />
        {/*Faculty Interface*/}
        <Route path="/Facultylogin" element={<Facultylogin/>}/>
        <Route path="/Facultydash" element={<><NavBar/><Facultydash /></>}/>
        <Route path="/Subject" element={<><NavBar/><Subject /></>} />
        <Route path="/levelPage" element={<><NavBar/><LevelPage /></>} />
        <Route path="/LeadView" element={<><NavBar/><LeadView /></>}/>
        <Route path="/leaderboard" element={<><NavBar/><Leaderboard /></>} />
        <Route path="/PageLayout" element={<><NavBar/><PageLayout /></>}/>
      </Routes>
    </Router>
 )
}
export default App;