import { Link } from 'react-router-dom';
function Subject() {
    const subject="SUBJECT";
    return (
      <div className='Scontainer' style={{padding:"5%"}}>
        <h2 style={{color:'#222831'}}>{subject}</h2>
        
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{paddingTop:"5%"}}>
      <div className="col">
      <Link to="/LevelPage" style={{ textDecoration: 'none' }}>
        <div className="card " style={{height:"200px",width: "350px",backgroundColor:"#76ABAE",borderRadius: "25px"}}>
          <div className="card-body d-flex align-items-center justify-content-center">
            <h5 className="card-title"style={{color:"#FFFFFF"}}>Level 1</h5>
          </div>
        </div>
        </Link>
      </div>
      <div className="col" >
      <Link to="/LevelPage" style={{ textDecoration: 'none' }}>
        <div className="card" style={{height:"200px", width: "350px",backgroundColor:"#76ABAE",borderRadius: "25px"}}>
          <div className="card-body d-flex align-items-center justify-content-center">
            <h5 className="card-title" style={{color:"#FFFFFF"}}>Level 2</h5>
          </div>
        </div>
        </Link>
      </div>
      <div className="col">
      <Link to="/LevelPage" style={{ textDecoration: 'none' }}>
        <div className="card" style={{height:"200px",width: "350px",backgroundColor:"#76ABAE",borderRadius: "25px"}}>
          <div className="card-body d-flex align-items-center justify-content-center"> 
            <h5 className="card-title" style={{color:"#FFFFFF"}}>Level 3</h5>
          </div>
        </div>
        </Link>
      </div>
    </div>
    </div>
      );
    
  }
  
  export default Subject
