import { Link } from 'react-router-dom';
function LevelPage() {
    const list = ["Quiz 1", "Quiz 2", "Quiz 3","Quiz 4"];
    const Levelno="1"
    return(
        <div style={{padding:"5%"}}>
            <div className="row">
                <div className="col-md-6 ">
                    <h2 style={{ margin: 0,color:"#222831" }}>LEVEL {Levelno}</h2>
                </div>
                <div className="col-md-6 d-grid d-md-flex justify-content-md-end">
                <Link to="/PageLayout"><button className="btn btn-primary" style={{ borderRadius: "25px", backgroundColor:"#76ABAE", border: "1px solid #76ABAE", color: "#FFFDFD",width: "200px" }}>
                    <h6>Add New Quiz</h6>
                    </button></Link>
                </div>
            </div>
            {/*correct here*/}
            <div style={{padding:"5%"}}>
            {list.map((quiz, index) => (
                <Link to="#" style={{ textDecoration: 'none' }}>
                <div className="card mb-3 shadow-bottom" style={{ width:"70rem",backgroundColor:"#EEEEEE",borderColor:"#76ABAE"}} key={index}>
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <h5 className="card-title" style={{color:"#222831"}}>{quiz}</h5>
                    </div>
                </div>
                </Link>
            ))}
            </div>
        </div>
    );
};
export default LevelPage;