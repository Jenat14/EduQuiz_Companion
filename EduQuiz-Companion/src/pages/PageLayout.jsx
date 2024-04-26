import React, { useState } from "react";
import { Link } from 'react-router-dom';
const PageLayout = () => {
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleDownloadTemplate = () => {
    const templateUrl = "../assets/template.xlsx"; 
    setFileDownloadUrl(templateUrl);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Simulate file upload completion
    setTimeout(() => {
      // Handle the selected file here
      console.log("Selected file:", selectedFile);
      setIsUploadComplete(true);
    }, 2000); // Simulating 2 seconds delay for upload completion
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleSave = () => {
    // Handle save functionality here
    console.log("Save button clicked");
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
      correctAnswer: 2, // Index of the correct answer option
    },
    {
      question: "Question 2",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 2,
      correctAnswer: 1,
    },
    {
      question: "Question 3",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      marks: 5,
      correctAnswer: 3,
    },
    // Add more questions here as needed
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add New Quiz</h1>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px"}}>
        <a href={fileDownloadUrl} download="template.xlsx">
          <button className="btn btn-light" style={{ width: "250px", background: "#76ABAE", color: "#ffffff", marginRight: "10px" }} onClick={handleDownloadTemplate}>Download template</button>
        </a>
        <label htmlFor="file-upload" type="button" className="btn upload-button" style={{ width: "250px", background: "#76ABAE", color: "#ffffff", marginRight: "10px" }}>
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          Upload Questions
        </label>
      </div>
      {isUploadComplete && (
        <div className="main-content py-4">
          <div className="container">
            {/* Map through questionsData array to render questions and options */}
            { questionsData.map((questionObj, index) => (
              <div key={ index } className="quiz-box" style={{backgroundColor:"#F7FCFC",borderColor:"#76ABAE"}}>
                <div className="row">
                  <div className="col-8">
                    <h5>{ questionObj.question }</h5>
                  </div>
                  <div className="col-4" style={{ textAlign:"end" }}>
                    <p>Marks: { questionObj.marks }</p>
                  </div>
                </div>
                <div className="row">
                  { questionObj.options.map((option, optionIndex) => (
                    <div key={ optionIndex } className="col-6 option">
                      <label htmlFor={`q${ index + 1 }_option${ optionIndex + 1 }`} style={{ display: 'flex' }}>
                        <input type="radio" id={`q${ index + 1 }_option${ optionIndex + 1 }`} name={`q${ index + 1 }`} value={`option${ optionIndex + 1 }`} style={{ width: '15px', margin: '5px' }} disabled />
                        <p style={{ margin: '5px' }}>{ option }</p>
                      </label>
                    </div>
                  )) }
                </div>
                <div className="row">
                  <div className="col-12" style={{ textAlign:"left" }}>
                    <p style={{ margin: "10px", padding: "5px" }}>Correct Answer: {questionObj.options[questionObj.correctAnswer]}</p>
                  </div>
                </div>
              </div>
            )) }
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "20px"}}>
          <div style={{ position: "relative", top:"20px",bottom: "20px", left: "20px", display: "flex", alignItems: "center" }}>
  <label style={{ marginRight: "10px", display: "flex", alignItems: "center", whiteSpace: "nowrap"}}>
    <input
      type="checkbox"
      checked={isSwitchOn}
      onChange={handleSwitchChange}
    />
    <span style={{ marginLeft: "5px" }}>Enable Reattempt</span>
  </label>
</div>
<Link to="/LevelPage"><div style={{ position: "relative",top:"20px",bottom: "20px", right: "20px" }}>
        <button className="btn btn-primary" onClick={handleSave} style={{backgroundColor:"#76ABAE",border:"none"}}>Save</button>
      </div></Link>
      </div>
          
        </div>
      )}
   
    </div>
  );
};

export default PageLayout;
