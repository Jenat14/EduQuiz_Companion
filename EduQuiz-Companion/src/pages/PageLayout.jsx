import React from "react";
import "../PageLayout.css"; // Import CSS file for custom styling


const PageLayout = () => {
  return (
     <div className="page-container">
      {/* Header Section */}
      
      <div className="header bg-teal text-white py-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6 text-md-left ">
              <button className="btn btn-light"style={{ width:"250px",background:"#76ABAE",position:"absolute",left:"115px",top:"85px"}}>Download Template</button>
            </div>
            <div className="col-md-6 text-md-right">
                <button className="btn btn-light"style={{width:"250px",background:"#76ABAE",position:"absolute",right:"115px",top:"85px"}}>Upload Template</button>
            </div>
          </div>
        </div>
      </div>
      <div className="Time">
        <>Time Limit: 15min</>
      </div>

     {/* Main Quiz Section */}
     <div className="main-content py-4">
        <div className="container">
          {/* Quiz Question 1 */}
          <div className="quiz-box">
            <h5>Question 1</h5>
            <div className="row">
              <div className="col-6 option">
                <input type="radio" id="q1_option1" name="q1" value="option1" />
                <label htmlFor="q1_option1">Option 1</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q1_option2" name="q1" value="option2" />
                <label htmlFor="q1_option2">Option 2</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q1_option3" name="q1" value="option3" />
                <label htmlFor="q1_option3">Option 3</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q1_option4" name="q1" value="option4" />
                <label htmlFor="q1_option4">Option 4</label>
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
          {/* Quiz Question 3 */}
          <div className="quiz-box">
            <h5>Question 1</h5>
            <div className="row">
              <div className="col-6 option">
                <input type="radio" id="q1_option1" name="q1" value="option1" />
                <label htmlFor="q1_option1">Option 1</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q1_option2" name="q1" value="option2" />
                <label htmlFor="q1_option2">Option 2</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q1_option3" name="q1" value="option3" />
                <label htmlFor="q1_option3">Option 3</label>
              </div>
              <div className="col-6 option">
                <input type="radio" id="q1_option4" name="q1" value="option4" />
                <label htmlFor="q1_option4">Option 4</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
