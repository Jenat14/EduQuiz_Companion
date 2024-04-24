import personIcon from "../assets/person-icon.png";
import { Link } from "react-router-dom";
import React, { useState } from 'react';


function NavBar(){
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // Implement password update logic here
    console.log('Updating password...');
    setIsModalOpen(false);
    window.alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordMatch(false);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
    return(
      <>
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
                  <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Change Password
    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item">
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
          <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
        </div>
        <div className="modal-body">
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
          <button type="button" className="btn btn-primary" style={{ backgroundColor: "#76ABAE", border: "none" }} data-bs-dismiss="modal"  onClick={handleUpdatePassword} disabled={isUpdateButtonDisabled()}>
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