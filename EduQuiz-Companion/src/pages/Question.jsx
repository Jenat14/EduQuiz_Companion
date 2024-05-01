import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Question.css"; // Import CSS file for custom styling

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

const Question = () => {
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State for timer
  const [timer, setTimer] = useState(localStorage.getItem("timer") || 900); // 15 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(JSON.parse(localStorage.getItem("selectedOptions")) || {});

  // Convert time remaining to HH:MM:SS format
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Fetch quiz details and questions
  useEffect(() => {
    const fetchQuizDetailsAndQuestions = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const quizParam = searchParams.get('quiz');

        if (!quizParam) {
          throw new Error('No quiz parameter found in the URL');
        }

        const decodedQuizData = decodeURIComponent(quizParam);
        const parsedQuizData = JSON.parse(decodedQuizData);

        // Fetch quiz details
        const id = localStorage.getItem("subId");
        const level = localStorage.getItem("level");
        const quizResponse = await fetch(`http://localhost:3000/quizdata/quizd?subjectId=${id}&level=${level}&name=${parsedQuizData}`);
        if (!quizResponse.ok) {
          throw new Error('Failed to fetch quiz details');
        }
        const quizData = await quizResponse.json();

        // Set quiz details state
        setQuizDetails(quizData);

        // Fetch questions
        const questionsResponse = await fetch('http://localhost:3000/quizdata/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quizId: quizData.id }),
        });
        if (!questionsResponse.ok) {
          throw new Error('Failed to fetch questions');
        }
        const questionsData = await questionsResponse.json();
        // Set questions state
        setQuestions(questionsData.questions);
      } catch (error) {
        console.error('Error fetching quiz details and questions:', error);
        // Set error state
        setError('Failed to fetch quiz details and questions');
      }
    };

    fetchQuizDetailsAndQuestions();
  }, []);

  // Timer logic
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

  // Save selected options to local storage whenever selectedOptions state changes
  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  
    return () => {
      localStorage.removeItem("selectedOptions"); // Clear selectedOptions when component unmounts
    };
  }, [selectedOptions]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    // Update selectedOptions state
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionIndex]: optionIndex
    }));
  };

  const handleFinish = () => {
    setIsTimerRunning(false); // Stop the timer when Finish button is clicked
    localStorage.removeItem("timer"); // Clear the timer value from localStorage
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizDetails || questions.length === 0) {
    return <div>Loading...</div>;
  }

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
                <h2>{localStorage.getItem("subjectname")}</h2>
              </div>
              <div className=" finish-btn  text-right">
                <Link to="/Result"><button className="btn btn-light" style={{ position:"absolute", right:"155px"}} onClick={handleFinish}>Finish</button></Link>
              </div>
              <div className="level-info">
                <h3>Level:  {quizDetails.level}</h3>
                <h3>Time left: {formatTime(timer)}</h3> {/* Display time left */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ paddingTop:"30px" }}>Time Limit: {quizDetails.time}min</div>
          <div style={rightAlign}>
            <div style={{ paddingRight:"30px" }}>Total Questions: {quizDetails.numberOfQuestions}</div>
            <div style={{ paddingRight:"30px" }}>Maximum Mark: {quizDetails.totalMarks}</div>
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
                        <input 
                          type="radio" 
                          id={`q${index + 1}_option${optionIndex + 1}`} 
                          name={`q${index + 1}`} 
                          value={`option${optionIndex + 1}`} 
                          style={inputStyle} 
                          disabled={!isTimerRunning} 
                          checked={selectedOptions[index] === optionIndex} // Set checked state based on selectedOptions
                          onChange={() => handleOptionChange(index, optionIndex)} // Call handleOptionChange when option is selected
                        />
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
