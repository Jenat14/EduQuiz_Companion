import "../styles.css";
import Home1 from "../assets/Home1.jpg";
import Home2 from "../assets/Home2.jpg";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <> 
      <header>
        <nav className="navbar navbar-expand-lg  bg-light  fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" style={{fontWeight:"700",color:"#555555"}}>
              <img src="#"></img> EduQuiz.
            </a>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#mission">
                  Mission
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li id="dropdown" className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                  <Link to="/#" className="dropdown-item">
            Student Login
          </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Faculty Login
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <body>
        <div id="home" className="section full-screen">
          <div className="home-row">
            <h1 style={{fontStyle:"Bold",color:"#76ABAE"}}>
              EDUQUIZ <br />
              COMPANION
            </h1>
            <div className="textbox">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque ullamcorpernisl at placerat.
               Nam diam purus, ultrices eu ligula ut, lacinia ornare lorem. Nunc sodales mauris eget turpis ullamcorper, 
               ac varius massa convallis. Mauris eleifend, libero vel consectetur sodales, nisi odio dictum eros, et finibus sem nibh et elit</p>
            </div><a href="#mission" className="btn-start">
              Get Started
            </a>
          </div>
          <div className="img">
            <img src={Home1} className="img-fluid" alt="" />
          </div>
        </div>
        <div id="mission" className="section half-screen">

          <div className="img">
            <img src={Home2} height="200" width="300" className="img-fluid" alt=""/>
          </div>
          <div className="col-md-7 pt-5" data-aos="fade-left">
            <h2 style={{fontStyle:"Bold",color:"#76ABAE"}}>MISSION</h2>
            <div className="textbox">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque ullamcorper nisl at placerat. 
              Nam diam purus, ultrices eu ligula ut, lacinia ornare lorem. Nunc sodales mauris eget turpis ullamcorper, 
              ac varius massa convallis. Mauris eleifend, libero vel consectetur sodales, 
              nisi odio dictum eros, et finibus sem nibh et elit.
                Phasellus justo mauris, mattis vel </p>
          </div></div>
        </div>
        <div id="contact" className="section half-screen">
          <div className="row">
            <h3>CONTACT US</h3>
            <p>Write to us about your queries!</p>
          </div>

          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Queries"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Send
            </button>
          </div>
        </div>
        <div className="footer">
          <div className="container footer-bottom clearfix">
            <div className="copyright">
              &copy; 2024{" "}
              <strong>
                <span>EduQuiz Companion</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a>Team Techies</a>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default HomePage;
