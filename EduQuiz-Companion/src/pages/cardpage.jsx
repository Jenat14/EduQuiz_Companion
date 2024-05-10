import React from 'react';
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

  // Define an array of objects to store subject details
  const subjects = [
    { id: 'S-OS-001', name: 'Operating Systems', image: img2 },
    { id: 'S-DS-002', name: 'Data Structures', image: img3 },
    { id: 'S-DMS-003', name: 'Database Management System', image: img4 },
    { id: 'S-COA-004', name: 'Computer Organization And Architecture', image: img5 },
    { id: 'S-FLAT-005', name: 'Formal Languages And Automata Theory', image: img6 }
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="container-f">
        <h2><b>STUDENT DASHBOARD</b></h2>
      </div>

      <div className="card-container-f card-row-f">
        {/* Map over the subjects array to generate cards */}
        {subjects.map((subject, index) => (
          <div key={index} className="card-f">
            <Link to={{ pathname: "/StudentSub", search: `?subjectId=${subject.id}` }} style={{ textDecoration: "none" }}>
              <img src={subject.image} alt={subject.name} className="card-image-f" />
              <div className="card-content-f">
                <button className="card-button"><b>{subject.name}</b></button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facultydash;
