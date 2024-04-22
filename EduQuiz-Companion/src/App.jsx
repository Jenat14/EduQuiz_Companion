import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
function App() {
  return (
    <Router>
      <NavBar /> {/* Render NavBar component */}
      <div style={{ marginTop: "70px", padding: "20px" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      </div>
    </Router>
 )
}
export default App;