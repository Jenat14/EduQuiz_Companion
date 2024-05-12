import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import icon from "../assets/message-circle.svg";
import send from "../assets/send.svg";
import robot from "../assets/robot.png";
import "../LeadView.css"; 
const timeStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: '5px',
  padding: '20px',
  paddingLeft:'0px',
  width: '80rem', 
  margin: '0 auto', 
};
const rightAlign = {
  textAlign: 'right',
};
const labelStyle = {
  display: 'flex',
};
const inputStyle = {
  width:'15px',
  margin: '5px', 
};
const paragraphStyle = {
  margin: '5px', 
};
const LeadView = () => {
  const location = useLocation();
  const data = location.state;

let selectedOptions = {}; 
if (data) {
  const selectedOptionsString = data.selectedOptions; 
  if (selectedOptionsString) {
    selectedOptions = JSON.parse(selectedOptionsString);
  } else {
    console.log("selectedOptionsString is null");
  }
} else {
  console.log("location.state is null");
}
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const id = localStorage.getItem('Id');
  const role = id && id.startsWith('F') ? 'faculty' : 'student';
  const [CisOpen, setCIsOpen] = useState(false);
  localStorage.setItem("role",role)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatMessagesRef = useRef(null);
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };
useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const toggleChatbot = () => {
    setCIsOpen(!CisOpen);
  };
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
      const id = localStorage.getItem("subId");
      const level = localStorage.getItem("level");
      console.log(localStorage.getItem("subId"));
      console.log(localStorage.getItem("level"));
      const quizResponse = await fetch(`http://localhost:3000/quizdata/quizd?subjectId=${id}&level=${level}&name=${parsedQuizData}`);
      if (!quizResponse.ok) {
        throw new Error('Failed to fetch quiz details');
      }
      const quizData = await quizResponse.json();
      setQuizDetails(quizData);
      
      localStorage.setItem("quizid",quizData.id);
      localStorage.setItem("reattempt",quizData.reattempt);
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
    return( 
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
 ) }
 const handleMessageSend = () => {
  if (newMessage.trim() === '') {
    return; 
  }
  const updatedMessages = [...messages, newMessage];
  setMessages(updatedMessages);
  setNewMessage(''); 
};
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleMessageSend();
  }
};

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
                <Link to={`/Leaderboard?quizId=${localStorage.getItem("quizid")}`} >
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
  <div key={index} className="quiz-box" style={{ backgroundColor: "#F7FCFC", borderColor: "#76ABAE" }}>
    <div className="row">
      <div className="col-8">
        <h5>{index + 1}. {questionObj.question}</h5>
      </div>
      <div className="col-4" style={{ textAlign: "end" }}>
        <p>Marks: {questionObj.mark}</p>
      </div>
    </div>
    <div className="row">
      {[1, 2, 3, 4].map(optionIndex => {
        const optionKey = `option${optionIndex}`;
        const selectedOptionIndex = selectedOptions[index] +1; 
        return (
          <div key={optionIndex} className="col-6 option">
            <label htmlFor={`q${index + 1}_option${optionIndex}`} style={labelStyle}>
              <input
                type="radio"
                id={`q${index + 1}_option${optionIndex}`}
                name={`q${index + 1}`}
                value={optionKey}
                style={inputStyle}
                checked={selectedOptionIndex === optionIndex}
                className={selectedOptionIndex === optionIndex ? (questionObj.correctAnswer === questionObj[optionKey] ? "correct-answer" : "wrong-answer") : ""}
              />
              <p style={paragraphStyle}>
                {questionObj[optionKey]}
                {selectedOptionIndex === optionIndex ?  (questionObj.correctAnswer === questionObj[optionKey] ? " " : "  ❌") : ""}
              </p>
            </label>
          </div>
        );
      })}
    </div>
    <div className="row">
      <div className="col-12" style={{ textAlign: "left" }}>
        <p style={{ margin: "10px", padding: "5px", fontWeight: "bold", color: "green" }}>Correct Answer: {questionObj.correctAnswer}</p>
      </div>
    </div>
  </div>
))}

          </div>
        </div>
        {role === 'student' && (
          <div className='Chatbot'>
            <div className="chatbot-icon" onClick={toggleChatbot}>
              <img src={icon} alt="Chatbot" />
            </div>
            {CisOpen && (
               <div className="chatbot-interface">
                 <div className="assist-container">
            <div className="icon-container">
                <img src={robot} alt="Icon" className="icon" />
            </div>
            <h3 className="text">ChatBot</h3>
        </div>
               <div ref={chatMessagesRef} className="chat-messages ">
                 {messages.map((message, index) => (
                   <div key={index} className={message.sender === 'student' ? 'message sent-message' : 'message received-message'}>
                     {message}
                   </div>
                 ))}
               </div>
               
               <div className="chat-input">
                 <input
                   type="text"
                   placeholder="Type your message..."
                   value={newMessage}
                   onChange={(e) => setNewMessage(e.target.value)}
                   onKeyPress={handleKeyPress}
                 />
                  <img src={send} onClick={handleMessageSend}/>
               </div>
             </div>
            )}
          </div>
        )}
      </div>

    </>
  );
};

export default LeadView;