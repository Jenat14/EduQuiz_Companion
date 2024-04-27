
import "../LeadView.css"; // Import CSS file for custom styling
import { Link } from 'react-router-dom';

const LeadView = () => {
  const timeStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    padding: '20px',
    paddingLeft:'0px',
    width: '80rem', // Adjust width as needed
    margin: '0 auto', // Center the container
  };

  const rightAlign = {
    textAlign: 'right',
  };
  const labelStyle = {
    display: 'flex',
  };
  
  const inputStyle = {
    width:'15px',
    margin: '5px', // Adjust as needed
  };
  
  const paragraphStyle = {
    margin: '5px', // Remove default margins
  };
   
   const questionsData = [
    {
      question: "Question 1",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 10,
      correctAnswer: 2,
    },
    {
      question: "Question 2",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 2,
      correctAnswer: 3,
    },
    {
      question: "Question 3",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 5,
      correctAnswer: 1,
    },
    // Add more questions here as needed
  ];
   
   
  return (
    <>
      <div className="page">
      <div className="top-bar bg-teal text-white py-2" style={{height:"150px"}} >
        <div className="container-fluid">
          <div className="row align-items-center" style={{paddingTop:"30px"}}>
            <div className="col-12 col-md-4">
              <h2>OPERATING SYSTEMS</h2>
            </div>
            <div className=" finish-btn  text-right">
              <button className="btn btn-light"style={{position:"absolute",right:"155px",top:"180px",padding:"10px"}}>View Leaderboard</button>
            </div>
            <div className="level-info" >
              <br></br>
                <h3>Level: 1</h3>
              </div>
            
          </div>
        </div>
      </div>
      <div >
      <div style={{paddingTop:"30px"}}>Time Limit: 15min</div>
      <div style={rightAlign}>
      <div style={{paddingRight:"30px"}}>Total Questions: 10</div>
      <div style={{paddingRight:"30px"}}>Maximum Mark: 100</div>
      </div>
    </div>

      {/* Main Quiz Section */}
      <div className="main-content py-4">
        <div className="container">
          {/* Map through questionsData array to render questions and options */}
          {questionsData.map((questionObj, index) => (
            <div key={index} className="quiz-box"style={{backgroundColor:"#F7FCFC",borderColor:"#76ABAE"}}>
              <div className="row">
                <div className="col-8">
                  <h5>{questionObj.question}</h5>
                </div>
                <div className="col-4" style={{textAlign:"end"}}>
                  <p>Marks: {questionObj.marks}</p>
                </div>
              </div>
              <div className="row">
                {questionObj.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="col-6 option">
                    <label htmlFor={`q${index + 1}_option${optionIndex + 1}`} style={labelStyle}>
                    <input type="radio" id={`q${ index + 1 }_option${ optionIndex + 1 }`} name={`q${ index + 1 }`} value={`option${ optionIndex + 1 }`} style={{ width: '15px', margin: '5px' }} disabled />
                      <p style={paragraphStyle}>{option}</p>
                    </label>
                  </div>
                ))}
              </div>
              <div className="row">
                  <div className="col-12" style={{ textAlign:"left" }}>
                    <p style={{ margin: "10px", padding: "5px" }}>Correct Answer: {questionObj.options[questionObj.correctAnswer]}</p>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default LeadView;
