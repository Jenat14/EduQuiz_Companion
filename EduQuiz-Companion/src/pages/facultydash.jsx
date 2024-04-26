import React from 'react';
import '../pages/Facultydash.css'; // Import your CSS file here
import img2 from '../assets/os.jpeg'; // Import your image here
import img3 from '../assets/dsa.jpg';
import img4 from '../assets/dbms.png';
import img5 from '../assets/coa.webp';
import img6 from '../assets/flat.jpg';

const Facultydash = () => {
  return (
<div>
<div class="container-f">
<h1><b>FACULTY DASHBOARD</b></h1>
<button className='top-right-button'> Add New Subject </button>
</div>
        
    <div className="card-container-f">
  
      <div className="card-row-f">
        <div className="card-f">
          <img src={img2} alt="Card" className="card-image-f" />
          <div className="card-content">
            <button className="card-button"><b>Operating <br/>Systems</b></button>
          </div>
        </div>

        <div className="card-f">
          <img src={img3} alt="Card" className="card-image-f" />
          <div className="card-content">
            <button className="card-button"><b>Data <br/>Structures</b></button>
          </div>
        </div>

        <div className="card-f">
          <img src={img4} alt="Card" className="card-image-f" />
          <div className="card-content">
            <button className="card-button"><b>Database Management System</b></button>
          </div>
        </div>
      </div>

      <div className="card-row-f">
        <div className="card-f">
          <img src={img5} alt="Card" className="card-image-f" />
          <div className="card-content">
            <button className="card-button"><b>Computer Organization And Architecture</b></button>
          </div>
        </div>

        <div className="card-f">
          <img src={img6} alt="Card" className="card-image-f" />
          <div className="card-content">
            <button className="card-button"><b>Formal Languages And Automata Theory</b></button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Facultydash;
