import React, { useState, useEffect } from "react";
import "../Question.css"; // Import CSS file for custom styling

const Question = () => {

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
   // State for timer
   const [timer, setTimer] = useState(900); // 15 minutes in seconds

   // Convert time remaining to HH:MM:SS format
   const formatTime = (time) => {
     const hours = Math.floor(time / 3600);
     const minutes = Math.floor((time % 3600) / 60);
     const seconds = time % 60;
     return `${hours.toString().padStart(2, "0")}:${minutes
       .toString()
       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
   };
   const questionsData = [
    {
      question: "Question 1",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      question: "Question 2",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      question: "Question 3",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    // Add more questions here as needed
  ];
   // Update time every second
   useEffect(() => {
     const intervalId = setInterval(() => {
       setTimer((prevTimer) => prevTimer - 1);
     }, 1000);
 
     // Clear interval on component unmount
     return () => clearInterval(intervalId);
   }, []
   );
   
  return (
    <div className="quiz-container">
      {/* Top Bar with Subject Name, Remaining Time, and Submit Button */}
      <div className="top-bar bg-teal text-white py-2" style={{width:"80rem"}}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-md-4">
              <h2>OPERATING SYSTEMS</h2>
            </div>
            <div className=" finish-btn col-12 col-md-4 text-right">
              <button className="btn btn-light"style={{position:"absolute",right:"155px",top:"180px"}}>Finish</button>
            </div>
            <div className="level-info">
                <h3>Level: 1</h3>
                <h3>Time left: {formatTime(timer)}</h3> {/* Display time left */}
              </div>
            
          </div>
        </div>
      </div>
      <div style={timeStyle}>
      <div>Time Limit: 15min</div>
      <div style={rightAlign}>
      <div >Total Questions: 10</div>
      <div >Maximum Mark: 100</div>
      </div>
    </div>

      {/* Main Quiz Section */}
      <div className="main-content py-4">
        <div className="container">
          {/* Map through questionsData array to render questions and options */}
          {questionsData.map((questionObj, index) => (
            <div key={index} className="quiz-box">
              <h5>{questionObj.question}</h5>
              <div className="row">
                {questionObj.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="col-6 option">
                    <label htmlFor={`q${index + 1}_option${optionIndex + 1}`} style={labelStyle}>
                      <input type="radio" id={`q${index + 1}_option${optionIndex + 1}`} name={`q${index + 1}`} value={`option${optionIndex + 1}`} style={inputStyle} />
                      <p style={paragraphStyle}>{option}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
