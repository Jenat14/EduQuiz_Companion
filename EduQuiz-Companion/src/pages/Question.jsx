import React from "react";
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
                <>Time left: 12:12:12</>
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
      <div className="main-content py-4" >
        <div className="container">
          {/* Quiz Question 1 */}
          <div className="quiz-box">
            <h5>Question 1</h5>
            <div className="row">
              <div className="col-6 option">
              <label htmlFor="q1_option1" style={labelStyle}>
                <input type="radio" id="q1_option1" name="q1" value="option1" style={inputStyle} />
                <p style={paragraphStyle}>Option 1</p>
              </label>
              </div>
              <div className="col-6 option">
                <label htmlFor="q1_option1" style={labelStyle}>
                <input type="radio" id="q1_option1" name="q1" value="option1" style={inputStyle} />
                <p style={paragraphStyle}>Option 1</p>
              </label>
              </div>
              <div className="col-6 option">
              <label htmlFor="q1_option1" style={labelStyle}>
                <input type="radio" id="q1_option1" name="q1" value="option1" style={inputStyle} />
                <p style={paragraphStyle}>Option 1</p>
              </label>
              </div>
              <div className="col-6 option">
              <label htmlFor="q1_option1" style={labelStyle}>
                <input type="radio" id="q1_option1" name="q1" value="option1" style={inputStyle} />
                <p style={paragraphStyle}>Option 1</p>
              </label>
              </div>
            </div>
          </div>

          {/* Quiz Question 2 */}
          <div className="quiz-box">
            <h5>Question 2</h5>
            <div className="row">
              <div className="col-6 option">
                <input type="radio" id="q2_option1" name="q2" value="option1" />
                <label htmlFor="q2_option1">Option 1</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q2_option2" name="q2" value="option2" />
                <label htmlFor="q2_option2">Option 2</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q2_option3" name="q2" value="option3" />
                <label htmlFor="q2_option3">Option 3</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q2_option4" name="q2" value="option4" />
                <label htmlFor="q2_option4">Option 4</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
