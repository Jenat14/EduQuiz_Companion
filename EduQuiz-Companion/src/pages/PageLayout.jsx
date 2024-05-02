import React, { useState } from "react";
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx"; // Import xlsx library

const PageLayout = () => {
  console.log(localStorage.getItem("subId"))
  console.log(localStorage.getItem("Id"))
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const handleDownloadTemplate = () => {
    const templateUrl = "../assets/Book1.xlsx"; 
    setFileDownloadUrl(templateUrl);
  };
  const rightAlign = {
    textAlign: 'right',
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const acceptedFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    // Check if the selected file is of the accepted types
    if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const filteredData = jsonData.slice(3).filter((row) => row[0]);
        const quizData = jsonData[1]; // Assuming quizData is in the second row of jsonData

        setJsonData(filteredData);
        setQuizData(quizData);
        setIsUploadComplete(true);
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      // Alert user about the invalid file type
      window.alert("Please upload a valid Excel file (xls or xlsx).");
    }
  };
  const handleSwitchChange = () => {
    // Set value to true if isSwitchOn is false, and false if isSwitchOn is true
    const value = !isSwitchOn;
    setIsSwitchOn(value);

  };
  const handleSave = async () => {
    try {

      const quizResponse = await fetch("http://localhost:3000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:"quiz3",
          level: quizData[0],
          time: quizData[1],
          numberOfQuestions: quizData[2],
          reattempt: isSwitchOn,
          facultyId: localStorage.getItem("Id"),
          subjectId: localStorage.getItem("subId"),
          totalMarks: quizData[3],
        }),
      });

      if (!quizResponse.ok) {
        window.alert("Failed to create quiz.");
        return;
      }
      const { quizId } = await quizResponse.json();
        // Iterate over each item in mappedData and make a POST request for each item
        for (const item of jsonData) {
            const mappedData = {
                quizId: quizId,
                questionNumber: item[0],
                question: item[1],
                option1: item[2],
                option2: item[3],
                option3: item[4],
                option4: item[5],
                correctAnswer: item[6],
                mark: item[7],
            };
            const jsonString = JSON.stringify(mappedData);
            // Make POST request to backend for each item
            const response = await fetch("http://localhost:3000/question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
               // body: JSON.stringify(mappedData),
               body:jsonString,
            });

            if (!response.ok) {
                // If the response is not okay, throw an error
                window.alert(`Failed to upload question ${mappedData.questionNumber}`);
            }
        }

        // If all POST requests are successful, show success message
        window.alert("Questions uploaded successfully.");
    } catch (error) {
        // If an error occurs during any POST request, show error message
        console.error("Error uploading questions:", error);
        window.alert("Failed to upload questions. Please try again later.");
    }
};
const questionsData = jsonData ? jsonData.map((item, index) => ({
  question: item[1],
  options: [item[2], item[3], item[4], item[5]],
  marks: parseInt(item[7]), // Assuming the mark is stored as a string and needs to be converted to a number
  correctAnswer: item[6], // Assuming the correct answer index is stored as a string and needs to be converted to a number
})) : [];

  return (
    <div style={{marginTop:"70px"}}>
      <h1 style={{ textAlign: "center" }}>Add New Quiz</h1>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px"}}>
        <a href={fileDownloadUrl} download="template.xlsx">
          <button className="btn btn-light" style={{ width: "250px", background: "#76ABAE", color: "#ffffff", marginRight: "10px" }} onClick={handleDownloadTemplate}>Download template</button>
        </a>
        <label
          htmlFor="file-upload"
          type="button"
          className="btn upload-button"
          style={{
            width: "250px",
            background: "#76ABAE",
            color: "#ffffff",
            marginRight: "10px",
          }}
        >
          <input
            type="file"
            id="file-upload"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          Upload Questions
        </label>
      </div>
      {isUploadComplete && jsonData &&  (
        <>
        <div>
          <div style={{ paddingTop:"30px",paddingLeft:"30px" }}>Time Limit: {quizData[1]} minutes</div>
          <div style={rightAlign}>
            <div style={{ paddingRight:"30px" }}>Total Questions: {quizData[2]}</div>
            <div style={{ paddingRight:"30px" }}>Maximum Marks: {parseInt(quizData[3])}</div>
          </div>
  </div>
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
    <p style={{ margin: "10px", padding: "5px", fontWeight:"bold",color:"green"}}>Correct Answer: {questionObj.correctAnswer}</p>
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
        </>
      )}
   
    </div>
  );
};

export default PageLayout;
