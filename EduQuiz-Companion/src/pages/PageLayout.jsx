import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import "../PageLayout.css"
const PageLayout = () => {
  const quizName = `  Quiz ${localStorage.getItem("quiznum")}`;
  console.log(localStorage.getItem("subId"));
  console.log(localStorage.getItem("Id"));
  const [fileDownloadUrl, setFileDownloadUrl] = useState("");
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [jsonData, setJsonData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  //download template function
  const handleDownloadTemplate = () => {
    const templateUrl = "http://localhost:5173/Book1.xlsx";
    setFileDownloadUrl(templateUrl);
  };
  const rightAlign = {
    textAlign: "right",
  };
  //convering xlsx file to json file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const acceptedFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const filteredData = jsonData.slice(3).filter((row) => row[0]);
        const quizData = jsonData[1];
        setJsonData(filteredData);
        setQuizData(quizData);
        setIsUploadComplete(true);
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      window.alert("Please upload a valid Excel file (xls or xlsx).");
    }
  };
  //enable reattempt button
  const handleSwitchChange = () => {
    const value = !isSwitchOn;
    setIsSwitchOn(value);
  };

  //saving the quiz and questions
  const handleSave = async () => {
    try {
      const quizResponse = await fetch("http://localhost:3000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: quizName,
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
        const response = await fetch("http://localhost:3000/question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        if (!response.ok) {
          window.alert(
            `Failed to upload question ${mappedData.questionNumber}`
          );
        }
      }
      window.alert("Questions uploaded successfully.");
    } catch (error) {
      console.error("Error uploading questions:", error);
      window.alert("Failed to upload questions. Please try again later.");
    }
  };
  //preview of questions
  const questionsData = jsonData
    ? jsonData.map((item, index) => ({
        question: item[1],
        options: [item[2], item[3], item[4], item[5]],
        marks: parseInt(item[7]),
        correctAnswer: item[6],
      }))
    : [];
  const fetchAllItemsFromLocalStorage = () => {
    const allItems = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      allItems[key] = value;
    }
    return allItems;
  };
  const allItems = fetchAllItemsFromLocalStorage();
  console.log(allItems);

  return (
    <div style={{ marginTop: "70px" }}>
        <h1 className="text-center mb-4 mt-3 mt-sm-0 custom-padding" style={{ marginTop: "70px", paddingTop: "5%" }}>Add New Quiz</h1>
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 d-flex justify-content-center mb-2">
            <a href={fileDownloadUrl} download="template.xlsx">
              <button
                className="btn btn-light"
                style={{
                  width: "250px",
                  background: "#76ABAE",
                  color: "#ffffff",
                }}
                onClick={handleDownloadTemplate}
              >
                Download template
              </button>
            </a>
          </div>
          <div className="col-12 col-md-5 d-flex justify-content-center mb-2">
            <label
              htmlFor="file-upload"
              className="btn btn-light"
              style={{
                width: "250px",
                background: "#76ABAE",
                color: "#ffffff",
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
        </div>

      <div className="instructions-container">
        <h2 style={{ textAlign: "center" }}>General Instructions</h2>
        <p>
          Please read the following instructions carefully before adding a new
          quiz:
        </p>
        <ol>
          <li>
            You can download the template for adding quiz by clicking the
            download template button.
          </li>
          <li>
            Fill the required details and questions in the template and upload
            to the website.
          </li>
          <li>
            Strictly follow the template and fill all the details accurately.
          </li>
          <li>Enter the time in minutes.</li>
          <li>
            After checking the preview, click the save button to add the new
            quiz.
          </li>
          <li>Double-check all the questions and answers before saving.</li>
          <li>
            You can disable the permission for students to reattempt the quiz by
            deselecting the checkbox.
          </li>
          <li>You cannot edit the quiz once you save the Questions.</li>
        </ol>
      </div>

      {isUploadComplete && jsonData && (
        <>
          <div>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Preview</h2>
            <h3 style={{ textAlign: "center" , paddingTop:"10px"}}>{quizName}</h3>
            <div style={{ paddingTop: "20px", paddingLeft: "30px" }}>
              Time Limit: {quizData[1]} minutes
            </div>
            <div style={rightAlign}>
              <div style={{ paddingRight: "30px" }}>
                Total Questions: {quizData[2]}
              </div>
              <div style={{ paddingRight: "30px" }}>
                Maximum Marks: {parseInt(quizData[3])}
              </div>
            </div>
          </div>
          <div className="main-content py-4">
            <div className="container">
              {questionsData.map((questionObj, index) => (
                <div
                  key={index}
                  className="quiz-box"
                  style={{ backgroundColor: "#F7FCFC", borderColor: "#76ABAE" }}
                >
                  <div className="row">
                    <div className="col-8">
                      <h5>
                        {index + 1}. {questionObj.question}
                      </h5>
                    </div>
                    <div className="col-4" style={{ textAlign: "end" }}>
                      <p>Marks: {questionObj.marks}</p>
                    </div>
                  </div>
                  <div className="row">
                    {questionObj.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="col-6 option">
                        <label
                          htmlFor={`q${index + 1}_option${optionIndex + 1}`}
                          style={{ display: "flex" }}
                        >
                          <input
                            type="radio"
                            id={`q${index + 1}_option${optionIndex + 1}`}
                            name={`q${index + 1}`}
                            value={`option${optionIndex + 1}`}
                            style={{ width: "15px", margin: "5px" }}
                            disabled
                          />
                          <p style={{ margin: "5px" }}>{option}</p>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="row">
                    <div className="col-12" style={{ textAlign: "left" }}>
                      <p
                        style={{
                          margin: "10px",
                          padding: "5px",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Correct Answer: {questionObj.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  top: "20px",
                  bottom: "20px",
                  left: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSwitchOn}
                    onChange={handleSwitchChange}
                  />
                  <span style={{ marginLeft: "5px" }}>Enable Reattempt</span>
                </label>
              </div>
              <Link to={`/LevelPage?level=${quizData[0]}`}>
                <div
                  style={{
                    position: "relative",
                    top: "20px",
                    bottom: "20px",
                    right: "20px",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    style={{ backgroundColor: "#76ABAE", border: "none" }}
                  >
                    Save
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PageLayout;
