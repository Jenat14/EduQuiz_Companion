import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Facultydash.css"; // Import your CSS file here
import img2 from '../assets/os.jpeg'; // Import your image here
import img3 from '../assets/dsa.jpg';
import img4 from '../assets/dbms.png';
import img5 from '../assets/coa.webp';
import img6 from '../assets/flat.jpg';


const Facultydash = () => {
  const id = localStorage.getItem('Id');
  const role = id && id.startsWith('F') ? 'faculty' : 'student';
  localStorage.setItem("role", role);
  const [subjects, setSubjects] = useState([
    { id: 'S-OS-001', name: 'Operating Systems', image: img2 },
    { id: 'S-DS-002', name: 'Data Structures', image: img3 },
    { id: 'S-DMS-003', name: 'Database Management System', image: img4 },
    { id: 'S-COA-004', name: 'Computer Organization And Architecture', image: img5 },
    { id: 'S-FLAT-005', name: 'Formal Languages And Automata Theory', image: img6 }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ id: '', name: '', image: '' });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSubject({ ...newSubject, [name]: value });
    console.log("wo")
    console.log(newSubject)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Create a copy of the subjects array
    const updatedSubjects = [...subjects];
    
    // Add the new subject to the copy of the subjects array
    updatedSubjects.push(newSubject);
    
    // Update the subjects state with the new array
    setSubjects(updatedSubjects);
    
    // Clear the form and hide it
    setNewSubject({ id: '', name: '', image: '' });
    setShowForm(false);
};

  
  
console.log(subjects)

  // Define an array of objects to store subject details
  

  return (
    <div style={{ marginTop: "100px" }}>
      {!showForm && (
        <div className="container-f">
          <h2><b>FACULTY DASHBOARD</b></h2>
          <button className='top-right-button' onClick={toggleForm}>Add New Subject</button>
        </div>
      )}

      {/* Display the form if showForm is true */}
      {showForm && (
  <div className="container d-flex justify-content-center">
    <div className="form-floating" style={{backgroundColor:"#EEEEEE",padding:"20px",width:"60%"}}>
      <button type="button" className="btn-close" aria-label="Close" onClick={toggleForm} style={{ position: "absolute", top: "10px", right: "10px", fontSize: "1.5rem" }}></button>
      <h3 style={{color:"#76ABAE",paddingBottom:"20px"}}>Add New Subject</h3>
      <div className="mb-3">
        <label htmlFor="subjectName" className="form-label">Enter Subject Name</label>
        <input type="text" className="form-control" id="name"  name="name"  aria-describedby="subjectNameHelp" onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="subjectName" className="form-label">Enter Subject Id</label>
        <input type="text" className="form-control" id="id"  name="id" aria-describedby="subjectNameHelp" onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Add an Image</label>
        <input className="form-control" type="file" id="formFile" onChange={handleInputChange} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#76ABAE", color: "white", border: "none" }} onClick={(event) => handleSubmit(event)}>Add Subject</button>
    </div>
  </div>
)}


      {!showForm && (
        <div className="card-container-f">
          {/* Map over the subjects array to generate cards */}
          {subjects.map((subject, index) => (
            <div key={index} className="card-f">
              <Link to={{ pathname: "/Subject", search: `?subjectId=${subject.id}` }} style={{ textDecoration: "none" }}>
                <img src={subject.image} alt={subject.name} className="card-image-f" />
                <div className="card-content-f">
                  <button className="card-button" ><b>{subject.name}</b></button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Facultydash;
