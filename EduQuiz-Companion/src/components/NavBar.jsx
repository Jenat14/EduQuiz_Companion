import personIcon from "../assets/person-icon.png";
import { Link } from "react-router-dom";
import React, { useState,useEffect} from 'react';
import logo from "../assets/logo.png";


function NavBar(){
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const getHomeRoute = () => {
    const path = window.location.pathname;
    const studentHomeRoute = "/CardPage";
    const facultyHomeRoute = "/facultydash";
    const role=localStorage.getItem("role");
    if (path === "/StudentSub" || path === "/Result") {
      return studentHomeRoute; 
    } else if (path === "/Facultydash" || path === "/Subject" || path === "/LevelPage" || path === "/LeadView" || path === "/Leaderboard" || path === "/PageLayout") {
      if (path === "/LeadView" && role=="student") {
        return studentHomeRoute; 
      } else if (path === "/LeadView" && role=="faculty") {
        return facultyHomeRoute; 
      }else if (path === "/Leaderboard" && role=="student") {
        return studentHomeRoute;
      } else {
        return facultyHomeRoute; 
      }
    } 
  };
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setIsPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(e.target.value === newPassword);
  };

  const isUpdateButtonDisabled = () => {
    return !(currentPassword && newPassword && confirmPassword && isPasswordMatch);
  };

  const handleUpdatePassword = () => {
    fetch('http://localhost:3000/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: localStorage.getItem('Id'),
        userRole: localStorage.getItem("role"),
        current_password: currentPassword,
        new_password: newPassword
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update password');
        }
        setSuccessMessage('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsPasswordMatch(false);
        setTimeout(() => {
          setSuccessMessage('');
          setIsModalOpen(false); 
        }, 3000);
      })
      .catch(error => {
        setErrorMessage('Error updating password: ' + error.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
    return(
      <>
        <nav className="navbar navbar-expand-lg  bg-light  fixed-top" style={{marginBottom:"70px"}}>
          <div className="container-fluid">
            <a className="navbar-brand" style={{fontWeight:"700",color:"#555555"}}>
              <img src={logo} style={{height:"30px", width:"30px",marginTop:"0px"}}></img> EduQuiz.
            </a>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link" to={getHomeRoute()} style={{ color: "#555555", fontWeight: 600 }}>
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
                    <a className="dropdown-item disabled" aria-disabled="true" href="#" style={{color:"#76ABAE", fontWeight:"bold"}}>
                    {userName ? <span>{userName}</span> : <span>Loading...</span>}
                    </a>
                  </li>
                  <li>
                  <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Change Password
    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
          <button button type="button" className="btn-close"  data-bs-dismiss="modal"></button>

        </div>
        <div className="modal-body">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input type="password" className="form-control" id="currentPassword" value={currentPassword} onChange={handleCurrentPasswordChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleModalClose} data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" style={{ backgroundColor: "#76ABAE", border: "none" }}  onClick={handleUpdatePassword} disabled={isUpdateButtonDisabled()}>
            Update Password
          </button>
        </div>
      </div>
    </div>
</div>
        </>
    )
}
export default NavBar;