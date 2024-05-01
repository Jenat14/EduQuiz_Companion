import { useEffect, useState } from 'react';
import "../LeadView.css"; // Import CSS file for custom styling
import { Link } from 'react-router-dom';

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

const LeadView = () => {
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

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
              <Link to="/Leaderboard">
                <div className=" finish-btn  text-right">
                  <button className="btn btn-light" style={{position:"absolute",right:"60px",top:"180px",padding:"10px",borderRadius:"20px",width:"200px"}}>View Leaderboard</button>
                </div>
              </Link>

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
            {/* Map through questions array to render questions and options */}
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
                  <div className="col-6 option">
                    <label htmlFor={`q${index + 1}_option1`} style={labelStyle}>
                      <input type="radio" id={`q${ index + 1 }_option1`} name={`q${ index + 1 }`} value="option1" style={inputStyle} disabled />
                      <p style={paragraphStyle}>{questionObj.option1}</p>
                    </label>
                  </div>
                  <div className="col-6 option">
                    <label htmlFor={`q${index + 1}_option2`} style={labelStyle}>
                      <input type="radio" id={`q${ index + 1 }_option2`} name={`q${ index + 1 }`} value="option2" style={inputStyle} disabled />
                      <p style={paragraphStyle}>{questionObj.option2}</p>
                    </label>
                  </div>
                  <div className="col-6 option">
                    <label htmlFor={`q${index + 1}_option3`} style={labelStyle}>
                      <input type="radio" id={`q${ index + 1 }_option3`} name={`q${ index + 1 }`} value="option3" style={inputStyle} disabled />
                      <p style={paragraphStyle}>{questionObj.option3}</p>
                    </label>
                  </div>
                  <div className="col-6 option">
                    <label htmlFor={`q${index + 1}_option4`} style={labelStyle}>
                      <input type="radio" id={`q${ index + 1 }_option4`} name={`q${ index + 1 }`} value="option4" style={inputStyle} disabled />
                      <p style={paragraphStyle}>{questionObj.option4}</p>
                    </label>
                  </div>
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
