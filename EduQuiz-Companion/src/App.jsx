import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Subject from "./pages/Subject";
import LevelPage from "./pages/LevelPage";
import Leaderboard from "./pages/Leaderboard";
import LoginStudent from "./pages/loginS";
import Facultylogin from "./pages/Facultylogin";
import StudentSub from "./pages/StudentSub";
import CardPage from "./pages/cardpage";
import Facultydash from "./pages/facultydash";
import Result from "./pages/Result";
import Question from "./pages/Question";
import PageLayout from "./pages/PageLayout";
import LeadView from "./pages/LeadView";


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginStudent" element={<LoginStudent />} />
        <Route path="/Subject" element={<Subject />} />
        <Route path="/levelPage" element={<><NavBar/><LevelPage /></>} />
        <Route path="/leaderboard" element={<><NavBar/><Leaderboard /></>} />
        <Route path="/StudentSub" element={<><NavBar/><StudentSub /></>} />
        <Route path="/CardPage" element={<><NavBar/><CardPage /></>} />
        <Route path="/Result" element={<><NavBar/><Result /></>} />
        <Route path="/Question" element={<Question/>}/>
        <Route path="/Facultylogin" element={<Facultylogin/>}/>
        <Route path="/Facultydash" element={<><NavBar/><Facultydash /></>}/>
        <Route path="/PageLayout" element={<><NavBar/><PageLayout /></>}/>
        <Route path="/LeadView" element={<><NavBar/><LeadView /></>}/>

        

      </Routes>
    </Router>
 )
}
export default App;