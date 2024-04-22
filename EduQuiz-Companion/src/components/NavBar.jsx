import personIcon from "../assets/person-icon.png";
import { Link } from "react-router-dom";
function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg  bg-light  fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" style={{fontWeight:"700",color:"#555555"}}>
              <img src="#"></img> EduQuiz.
            </a>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link"  to="#" style={{color:"#555555",fontWeight:600}}>
                  Home
                </Link>
              </li>
              <li id="dropdowns" className="nav-items">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <img src={personIcon} style={{height:"25px", width:"25px"}}></img>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item disabled" aria-disabled="true" href="#">
                      Name
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Change Password
                    </a>
                  </li>
                  <li>
                    <Link to="/HomePage" className="dropdown-item">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
    )
}
export default NavBar;