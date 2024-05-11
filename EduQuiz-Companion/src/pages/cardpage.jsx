import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Facultydash.css"; // Import your CSS file here
import img2 from '../assets/os.jpeg'; // Import your image here
import img3 from '../assets/dsa.jpg';
import img4 from '../assets/dbms.png';
import img5 from '../assets/coa.webp';
import img6 from '../assets/flat.jpg';

const Facultydash = () => {
  const [subjects, setSubjects] = useState([]);
  const id = localStorage.getItem('Id');
  const role = id && id.startsWith('F') ? 'faculty' : 'student';
  localStorage.setItem("role", role);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/subject/subjects'); 
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        setSubjects(data); 
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="container-f">
        <h2><b>STUDENT DASHBOARD</b></h2>
      </div>

      <div className="card-container-f">
        {subjects.map((subject) => (
          <div key={subject.id} className="card-f">
            <Link to={{ pathname: "/StudentSub", search: `?subjectId=${subject.id}` }} style={{ textDecoration: "none" }}>
              <img src={subject.data.imageUrl} alt={subject.data.Name} className="card-image-f" />
              <div className="card-content-f">
                <button className="card-button" ><b>{subject.data.Name}</b></button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facultydash;
