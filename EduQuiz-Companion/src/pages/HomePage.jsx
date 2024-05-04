import "../styles.css";
import Home1 from "../assets/Home1.jpg";
import Home2 from "../assets/Home2.jpg";
import { Link } from "react-router-dom";
import logo from "../assets/logof.jpg"
function HomePage() {
  return (
    <> 
      <header>
        <nav className="navbar navbar-expand-lg  bg-light  fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" style={{fontWeight:"700",color:"#555555"}}>
              <img src={logo} style={{height:"30px", width:"30px",marginTop:"0px"}}></img> EduQuiz.
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
                  <Link to="/LoginStudent" className="dropdown-item">
            Student Login
          </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Facultylogin">
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
            <p>EduQuiz Companion is a dynamic platform  specifically crafted for BTech Computer Science and Engineering students. 
              Dive into three challenging levels of quizzes across five core subjects, empowering students to enhance their understanding.
                With features like personalized quiz history, adaptive difficulty levels, and detailed performance insights, both students and faculty can embark 
                on a journey of interactive learning and assessment.</p>
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
            <p>Our mission is to revolutionize learning in BTech Computer Science and Engineering by providing a dynamic and engaging platform for comprehensive subject assessment. 
              Through EduQuiz Companion, we aim to empower students with personalized learning experiences, fostering deeper understanding and mastery of core concepts.
              By leveraging innovative technology,we strive to bridge the gap between traditional education and modern interactive learning methods, ensuring academic excellence for all. </p>
          </div></div>
        </div>
        <div id="contact" className="section half-screen">
  <div className="row">
    <div className="col">
      <h3>CONTACT US</h3>
      <p>Write to us about your queries!</p>
    </div>
  </div>

  <div className="row">
    <div className="col">
      <div className="input-group">
      <input
  type="text"
  className="form-control"
  id="queriesInput"
  placeholder="Enter your Queries"
  autoComplete="off" 

/>
        <div className="input-group-append">
  <button
    className="btn btn-outline-secondary"
    type="button"
    id="button-addon2"
    onClick={() => {
      const queries = document.getElementById("queriesInput").value;
      const encodedQueries = encodeURIComponent(queries);
      window.location.href = `mailto:jenat.csa2125@saintgits.org?subject=Queries&body=${encodedQueries}`;
      queriesInput.value = "";
    }}
  >
    Send
  </button>
</div>

      </div>
    </div>
  </div>
</div>

        <div className="footer">
          <div className="container footer-bottom clearfix">
            <div className="copyright" style={{paddingRight:"670px"}}>
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
