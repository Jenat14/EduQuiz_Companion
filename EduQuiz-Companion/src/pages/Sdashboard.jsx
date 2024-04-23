import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap components
import '../component/cardpage.css'
import img2 from '../assets/os.jpg';
import img3 from '../assets/ds.jpg';
import img4 from '../assets/dbms.jpg';
import img5 from '../assets/coa.jpg';
import img6 from '../assets/flat.jpg';
const CardPage = () => {
  return (
    <div className="container">
      <h1>STUDENT DASHBOARD</h1>
     <br></br>
      <div className="row">
        <div className="col-md-4">
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={img2} />
            <Card.Body>
              <Card.Title></Card.Title>
              
              <Button variant="primary" className='custom-button'><b>Operating System</b></Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ width: '15rem' }}>

            <Card.Img variant="top" src={img3} />
            <Card.Body>
              <Card.Title></Card.Title>
              
              <Button variant="primary" className='custom-button'><b>Data Structures</b></Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={img4} />
            <Card.Body>
              <Card.Title></Card.Title>
              
              <Button variant="primary" className='custom-button'><b>Database Management System</b></Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={img5} />
            <Card.Body>
              <Card.Title></Card.Title>
             
              <Button variant="primary" className='custom-button'><b>Computer Organization And Architecture</b></Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={img6} />
            <Card.Body>
              <Card.Title></Card.Title>
              
              <Button variant="primary" className='custom-button'><b>Formal Languages And Automata Theory</b></Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
