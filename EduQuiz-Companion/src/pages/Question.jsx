import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Question.css"; // Import CSS file for custom styling

const Question = () => {
  const navigate = useNavigate();

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
  const [timer, setTimer] = useState(localStorage.getItem("timer") || 10); // 15 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Convert time remaining to HH:MM:SS format
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    // Start the timer when the component mounts
    if (isTimerRunning) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem("timer", newTimer); // Save timer value to localStorage
          return newTimer;
        });
      }, 1000);

      // Redirect to /Result page when timer reaches 0
      if (timer === 0) {
        navigate("/Result");
        setIsTimerRunning(false); // Stop the timer
        localStorage.removeItem("timer"); // Clear the timer value from localStorage
        clearInterval(intervalId); // Clear the interval
      }
  
      // Clear interval when component unmounts
      return () => clearInterval(intervalId);
    }
  }, [isTimerRunning, timer, navigate]);

  const handleFinish = () => {
    setIsTimerRunning(false); // Stop the timer when Finish button is clicked
    localStorage.removeItem("timer"); // Clear the timer value from localStorage
  };
  
  const questionsData = [
    {
      question: "Question 1",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 10,
    },
    {
      question: "Question 2",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 2,
    },
    {
      question: "Question 3",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 5,
    },
    // Add more questions here as needed
  ];

  return (
    <>
      <div className="page">
        <div className="top-bar bg-teal text-white py-2" >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12 col-md-4">
                <h2>OPERATING SYSTEMS</h2>
              </div>
              <div className=" finish-btn  text-right">
                <Link to="/Result"><button className="btn btn-light" style={{ position:"absolute", right:"155px", top:"180px" }} onClick={handleFinish}>Finish</button></Link>
              </div>
              <div className="level-info">
                <h3>Level: 1</h3>
                <h3>Time left: {formatTime(timer)}</h3> {/* Display time left */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ paddingTop:"30px" }}>Time Limit: 15min</div>
          <div style={rightAlign}>
            <div style={{ paddingRight:"30px" }}>Total Questions: 10</div>
            <div style={{ paddingRight:"30px" }}>Maximum Mark: 100</div>
          </div>
        </div>

        {/* Main Quiz Section */}
        <div className="main-content py-4">
          <div className="container">
            {/* Map through questionsData array to render questions and options */}
            {questionsData.map((questionObj, index) => (
              <div key={index} className="quiz-box" style={{backgroundColor:"#F7FCFC",borderColor:"#76ABAE"}}>
                <div className="row">
                  <div className="col-8">
                    <h5>{questionObj.question}</h5>
                  </div>
                  <div className="col-4" style={{ textAlign:"end" }}>
                    <p>Marks: {questionObj.marks}</p>
                  </div>
                </div>
                <div className="row">
                  {questionObj.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="col-6 option">
                      <label htmlFor={`q${index + 1}_option${optionIndex + 1}`} style={labelStyle}>
                        <input type="radio" id={`q${index + 1}_option${optionIndex + 1}`} name={`q${index + 1}`} value={`option${optionIndex + 1}`} style={inputStyle} disabled={!isTimerRunning} />
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
    </>
  );
};

export default Question;
