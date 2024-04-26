import React from 'react';
import '../component/cardpage.css'; // Import your CSS file here
import img2 from '../assets/os.jpg'; // Import your image here
import img3 from '../assets/ds.jpg';
import img4 from '../assets/dbms.jpg';
import img5 from '../assets/coa.jpg';
import img6 from '../assets/flat.jpg';

const cardpage = () => {
  return (
    <div className="card-container">
      <h1><b>STUDENT DASHBOARD</b></h1>
  
      <div className="card-row">
        <div className="card">
          <img src={img2} alt="Card" className="card-image" />
          <div className="card-content">
            <button className="card-button"><b>Operating Systems</b></button>
          </div>
        </div>

        <div className="card">
          <img src={img3} alt="Card" className="card-image" />
          <div className="card-content">
            <button className="card-button"><b>Data Structures</b></button>
          </div>
        </div>

        <div className="card">
          <img src={img4} alt="Card" className="card-image" />
          <div className="card-content">
            <button className="card-button"><b>Database Management System</b></button>
          </div>
        </div>
      </div>

      <div className="card-row">
        <div className="card">
          <img src={img5} alt="Card" className="card-image" />
          <div className="card-content">
            <button className="card-button"><b>Computer Organization And Architecture</b></button>
          </div>
        </div>

        <div className="card">
          <img src={img6} alt="Card" className="card-image" />
          <div className="card-content">
            <button className="card-button"><b>Formal Languages And Automata Theory</b></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cardpage;
