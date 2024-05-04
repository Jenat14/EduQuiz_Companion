import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../LeadView.css"; // Import CSS file for custom styling

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

const LeadView = () => { // Receive role as a prop
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions')); // Get selectedOptions from localStorage
  const id = localStorage.getItem('Id');
  const role = id && id.startsWith('F') ? 'faculty' : 'student';
  useEffect(() => {
    // Fetch selectedOptions from localStorage
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    if (selectedOptions) {
      setSelectedOptions(selectedOptions);
    }
  }, []);
  console.log(selectedOptions);
  useEffect(() => {
    const fetchQuizDetailsAndQuestions = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const quizParam = searchParams.get('quiz');

        if (!quizParam) {
          throw new Error('No quiz parameter found in the URL');
        }
        let parsedQuizData;
        try {
          parsedQuizData = JSON.parse(quizParam);
        } catch (error) {
          throw new Error('Invalid quiz parameter format');
        }
  
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
      } catch (error) {
        console.error('Error fetching quiz details and questions:', error);
        setError('Failed to fetch quiz details and questions');
        console.log()
      }
    };

    fetchQuizDetailsAndQuestions();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizDetails || questions.length === 0) {
    return <div>Loading...</div>;  
  }

  return (
    <>
      <div className="page" style={{marginTop:"70px"}}>
        <div className="top-bar bg-teal text-white py-2" style={{height:"150px"}} >
          <div className="container-fluid">
            <div className="row align-items-center" style={{paddingTop:"30px"}}>
              <div className="col-12 col-md-4">
                <h2>{localStorage.getItem("subjectname")}</h2>
              </div>
              {role === 'faculty' ? (
                <Link to={`/Leaderboard?quizId=${localStorage.getItem("quizId")}`} >
                  <div className=" finish-btn  text-right">
                    <button className="btn btn-light" style={{position:"absolute",right:"60px",top:"180px",padding:"10px",borderRadius:"20px",width:"200px"}}>View Leaderboard</button>
                  </div>
                </Link>
              ) : ''}
              <div className="level-info" >
                <br />
                <h3>Level: {quizDetails.level}</h3>
              </div>
            </div>
          </div>
        </div>
        <div >
          <div style={{paddingTop:"30px"}}>Time Limit: {quizDetails.time} min</div>
          <div style={rightAlign}>
            <div style={{paddingRight:"30px"}}>Total Questions: {quizDetails.numberOfQuestions}</div>
            <div style={{paddingRight:"30px"}}>Maximum Mark: {quizDetails.totalMarks}</div>
          </div>
        </div>
        {/* Main Quiz Section */}
        <div className="main-content py-4">
          <div className="container">
            {questions.map((questionObj, index) => (
              <div key={index} className="quiz-box"style={{backgroundColor:"#F7FCFC",borderColor:"#76ABAE"}}>
                <div className="row">
                  <div className="col-8">
                    <h5>{questionObj.question}</h5>
                  </div>
                  <div className="col-4" style={{textAlign:"end"}}>
                    <p>Marks: {questionObj.mark}</p>
                  </div>
                </div>
                <div className="row">
  {/* Render options with highlighting if user is a student */}
  {[1, 2, 3, 4].map(optionIndex => {
    const optionKey = `option${optionIndex}`;
    return (
      <div key={optionIndex} className="col-6 option">
        <label htmlFor={`q${index + 1}_option${optionIndex}`} style={labelStyle}>
          <input
            type="radio"
            id={`q${index + 1}_option${optionIndex}`}
            name={`q${index + 1}`}
            value={optionKey}
            style={inputStyle}
            disabled // Always disabled
          />
          <p style={paragraphStyle}>{questionObj[optionKey]}</p>
        </label>
      </div>
    );
  })}
</div>
                <div className="row">
                  <div className="col-12" style={{ textAlign:"left" }}>
                    <p style={{ margin: "10px", padding: "5px",fontWeight:"bold",color:"green" }}>Correct Answer: {questionObj.correctAnswer}</p>
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