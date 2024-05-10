import React, { useState, useEffect } from "react";
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
  const [timer, setTimer] = useState(localStorage.getItem("timer")||900); // 15 minutes in seconds
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
      localStorage.setItem("quizname",parsedQuizData);
      // Fetch quiz details
      const id = localStorage.getItem("subId");
      const level = localStorage.getItem("level");
      console.log(localStorage.getItem("subId"));
      console.log(localStorage.getItem("level"));
      const quizResponse = await fetch(`http://localhost:3000/quizdata/quizd?subjectId=${id}&level=${level}&name=${parsedQuizData}`);
      if (!quizResponse.ok) {
        throw new Error('Failed to fetch quiz details');
      }
      const quizData = await quizResponse.json();
      // Set quiz details state
      setQuizDetails(quizData);
      
      localStorage.setItem("quizid",quizData.id);
      localStorage.setItem("reattempt",quizData.reattempt);
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
      setQuestions(questionsData.questions);
      setTimer(quizData.time * 60); // Convert minutes to seconds

    } catch (error) {
      console.error('Error fetching quiz details and questions:', error);
      // Set error state
      setError('Failed to fetch quiz details and questions');
    }

  };
  fetchQuizDetailsAndQuestions();
}, []);

useEffect(() => {
  const preventBack = () => {
    window.history.forward();
  };

  setTimeout(preventBack, 0);

  window.onunload = () => {
    null;
  };

  return () => {
    window.onunload = null;
  };
}, []);
useEffect(() => {
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ''; // For Chrome
    return ''; // For other browsers
  };

  const showAlertOnUnload = () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
  };

  const cleanup = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  showAlertOnUnload();

  return cleanup;
}, []);

// Alert message when attempting to change tabs
window.onblur = () => {
  if (isTimerRunning) {
    alert('Do not change tab while attending the quiz');
  }

};

  // Timer logic
  useEffect(() => {
    // Retrieve the timer value from local storage
    const storedTimer = localStorage.getItem("timer");
    // If a stored timer value exists and is a valid number, set it as the timer value
    if (storedTimer && !isNaN(storedTimer)) {
      setTimer(parseInt(storedTimer));
    } else {
      // Otherwise, set the initial timer value (e.g., 15 minutes)
      setTimer((quizDetails && quizDetails.time) ? (quizDetails.time * 60) : 900); // Convert minutes to seconds
    }
  
    // Start the timer when the component mounts
    if (isTimerRunning && timer >= 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem("timer", newTimer); // Save timer value to localStorage
          return newTimer;
        });
      }, 1000);
  
      // Redirect to /Result page when timer reaches 0
      if (timer === 0) {
        handleFinish(); // Call handleFinish function
        setIsTimerRunning(false); // Stop the timer
        localStorage.removeItem("timer"); // Clear the timer value from localStorage
        clearInterval(intervalId); // Clear the interval
      }
  
      // Clear interval when component unmounts
      return () => clearInterval(intervalId);
    }
  }, [isTimerRunning, timer, quizDetails]);
  
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
    const updatedSelectedOptions = {
      ...selectedOptions,
      [questionIndex]: optionIndex
    };
    localStorage.setItem("selectedOptions", JSON.stringify(updatedSelectedOptions));
  };

  const handleFinish = async () => {
    setIsTimerRunning(false); // Stop the timer when Finish button is clicked
    const totalTime = quizDetails.time*60; // Get the total time allocated for the quiz
    const timeTaken = totalTime - timer; // Calculate the time taken by subtracting remaining time from total time
  
    localStorage.removeItem("timer"); // Clear the timer value from localStorage
    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let attemptedQuestions = 0;
  
    questions.forEach((question, index) => {
      const selectedOptionIndex = selectedOptions[index];
      if (selectedOptionIndex !== undefined && selectedOptionIndex !== null) {
        attemptedQuestions++;
        if (question[`option${selectedOptionIndex + 1}`] === question.correctAnswer) {
          // If correct, add the mark to the total marks
          correctAnswers++;
          score += question.mark;
        } else {
          incorrectAnswers++;
        }
      }
    });
  
    // Calculate timestamp
    const timestamp = new Date().toISOString();
  
    // Prepare data for the fetch request
    const data = {
      studentId: localStorage.getItem("Id"),
      quizId: localStorage.getItem("quizid"),
      score,
      timestamp,
      timeTaken,
    };
  
    try {
      // Make the fetch request
      const response = await fetch('http://localhost:3000/resultUpdatedRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Check if request was successful
      if (response.ok) {
        console.log('Result created successfully');
      } else {
        console.error('Failed to create result:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating result:', error.message);
    }
  
    // Redirect to the result page or perform any other actions as needed
    navigate("/Result", {
      state: {
        score,
        correctAnswers,
        incorrectAnswers,
        attemptedQuestions
      }
    });
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizDetails || questions.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="spinner-grow" role="status" style={{ width: "2rem", height: "2rem", color: "#222831", marginRight: "1rem", animationDuration: "1s", animationDelay: "0s" }} />
          <div className="spinner-grow" role="status" style={{ width: "2rem", height: "2rem", color: "#2D5D81", marginRight: "1rem", animationDuration: "1s", animationDelay: "0.25s" }} />
          <div className="spinner-grow" role="status" style={{ width: "2rem", height: "2rem", color: "#76ABAE", animationDuration: "1s", animationDelay: ".5s" }} />
        </div>
        <p style={{ color: "#222831", marginTop: "1rem",fontFamily:"monospace" }}>Loading...</p>
      </div>
    </div>
    );
  }

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
                <button className="btn btn-light" style={{ position:"absolute", right:"155px"}} onClick={handleFinish}>Finish</button>
              </div>
              <div className="level-info">
                <h3>Level:  {quizDetails.level}</h3>
                <h3>Time left: {formatTime(timer)}</h3> {/* Display time left */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ paddingTop:"30px"}}>Time Limit: {quizDetails.time}min</div>
          <div style={rightAlign}>
            <div style={{ paddingRight:"30px" }}>Total Questions: {quizDetails.numberOfQuestions}</div>
            <div style={{ paddingRight:"30px" }}>Maximum Mark: {quizDetails.totalMarks}</div>
          </div>
        </div>

        {/* Main Quiz Section */}
        <div className="main-content py-4">
          <div className="container">
            {/* Map through questionsData array to render questions and options */}
            {questions.map((questionObj, index) => (
  <div key={index} className="quiz-box" style={{backgroundColor:"#F7FCFC", borderColor:"#76ABAE"}}>
    <div className="row">
      <div className="col-8">
        <h5>{index + 1}. {questionObj.question}</h5>
      </div>
      <div className="col-4" style={{textAlign:"end"}}>
        <p>Marks: {questionObj.mark}</p>
      </div>
    </div>
    <div className="row">
      <div className="col-6 option">
        <label htmlFor={`q${index + 1}_option1`} style={labelStyle}>
          <input 
            type="radio" 
            id={`q${index + 1}_option1`} 
            name={`q${index + 1}`} 
            value={questionObj.option1} 
            style={inputStyle} 
            disabled={!isTimerRunning} 
            checked={selectedOptions[index] === 0} 
            onChange={() => handleOptionChange(index, 0)} 
          />
          <p style={paragraphStyle}>{questionObj.option1}</p>
        </label>
      </div>
      <div className="col-6 option">
        <label htmlFor={`q${index + 1}_option2`} style={labelStyle}>
          <input 
            type="radio" 
            id={`q${index + 1}_option2`} 
            name={`q${index + 1}`} 
            value={questionObj.option2} 
            style={inputStyle} 
            disabled={!isTimerRunning} 
            checked={selectedOptions[index] === 1} 
            onChange={() => handleOptionChange(index, 1)} 
          />
          <p style={paragraphStyle}>{questionObj.option2}</p>
        </label>
      </div>
      <div className="col-6 option">
        <label htmlFor={`q${index + 1}_option3`} style={labelStyle}>
          <input 
            type="radio" 
            id={`q${index + 1}_option3`} 
            name={`q${index + 1}`} 
            value={questionObj.option3} 
            style={inputStyle} 
            disabled={!isTimerRunning} 
            checked={selectedOptions[index] === 2} 
            onChange={() => handleOptionChange(index, 2)} 
          />
          <p style={paragraphStyle}>{questionObj.option3}</p>
        </label>
      </div>
      <div className="col-6 option">
        <label htmlFor={`q${index + 1}_option4`} style={labelStyle}>
          <input 
            type="radio" 
            id={`q${index + 1}_option4`} 
            name={`q${index + 1}`} 
            value={questionObj.option4} 
            style={inputStyle} 
            disabled={!isTimerRunning} 
            checked={selectedOptions[index] === 3} 
            onChange={() => handleOptionChange(index, 3)} 
          />
          <p style={paragraphStyle}>{questionObj.option4}</p>
        </label>
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

export default Question;