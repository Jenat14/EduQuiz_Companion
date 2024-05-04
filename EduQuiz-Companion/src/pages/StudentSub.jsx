import "../styles.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

function StudentSub() {
  const [subname, setSubname] = useState("");
  const [activeLevel, setActiveLevel] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const subjectId = new URLSearchParams(location.search).get("subjectId");
    if (subjectId) {
      fetchSubjectName(subjectId);
    }
  }, [location]);
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

  const fetchSubjectName = (id) => {
    fetch(`http://localhost:3000/subject?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch subject");
        }
        return response.json();
      })
      .then((data) => {
        setSubname(data.name);
        localStorage.setItem("subjectname", data.name);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  };
 console.log(quizResults)
  const handleLevelClick = (level) => {
    setActiveLevel(level);
    fetchQuizResults(level);
  };

  const fetchQuizResults = (level) => {
    setQuizResults([]);
    const subjectId = new URLSearchParams(window.location.search).get("subjectId");
    localStorage.setItem("subId", subjectId);
    localStorage.setItem("level", level);
    const studentId=localStorage.getItem("Id")
    fetch('http://localhost:3000/quizDetailsRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subjectId, level ,studentId}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quiz names");
        }
        return response.json();
      })
      .then((data) => {
        setQuizResults(data.quizResults);
      })
      .catch((error) => {
        console.error("Error fetching quiz names:", error);
        setError('Failed to fetch quiz names');
      });
  };

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <h1 style={{ textAlign: "center", color: "#222831" }}>{subname}</h1>
        <div className="instructions-container">
          <h2>General Instructions</h2>
          <p>
            Welcome to the quiz! Please read the following instructions carefully
            before proceeding:
          </p>
          <ol>
            <li>Ensure you have a stable internet connection.</li>
            <li>Answer all questions to the best of your ability.</li>
            <li>Double-check your answers before submitting.</li>
            <li>Use the navigation buttons to move between questions.</li>
          </ol>
        </div>
        <div id="level-btn">
          <button
            type="button"
            className={`btn btn-lg ${activeLevel === "level1" ? "active" : ""}`}
            style={{ backgroundColor: activeLevel === "1" ? "#222831" : "#76ABAE" }}

            onClick={() => handleLevelClick("1")}
          >
            Level 1
          </button>
          <button
            type="button"
            className={`btn btn-lg ${activeLevel === "level2" ? "active" : ""}`}
            style={{ backgroundColor: activeLevel === "2" ? "#222831" : "#76ABAE" }}
            onClick={() => handleLevelClick("2")}
          >
            Level 2
          </button>
          <button
            type="button"
            className={`btn btn-lg ${activeLevel === "level3" ? "active" : ""}`}
            style={{ backgroundColor: activeLevel === "3" ? "#222831" : "#76ABAE" }}
            onClick={() => handleLevelClick("3")}
          >
            Level 3
          </button>
        </div>
        {quizResults.length > 0 &&  activeLevel &&  (
          <div className="level-click">
            {quizResults.map((quiz, index) => (
              <div
                className="card mb-3 shadow-bottom"
                style={{
                  width: "70rem",
                  backgroundColor: "#EEEEEE",
                  borderColor: "#76ABAE",
                  margin: "20px auto",
                }}
                key={index}
              >
              <div className="card-body d-flex flex-column align-items-center justify-content-between" style={{padding:"100px "}}>
                  <h5 className="card-title" style={{ color: "#222831", position:"absolute",left:"6px",top:"0px",padding:"10px"}}>
                    {quiz.name}
                  </h5>
                  <div className="attempt" style={{position:"absolute",left:"90px",top:"25px",padding:"10px"}}>
                    <p>Number of Questions: {quiz.numberOfQuestions}</p>
                    <p>Time: {quiz.time} minutes</p>
                    <p>Your Score: {quiz.score !== null ? quiz.score : "Not attempted yet"}</p>
                    <p>No. of Attempts: {quiz.noofattempts !== null ? quiz.noofattempts : "Not attempted yet"}</p>
                  </div>
                  <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                  <Link
                      to={`/Question?quiz=${encodeURIComponent(JSON.stringify(quiz.name))}`}
                      className={`btn btn-primary btn-sm ${(!quiz.reattempt && quiz.noofattempts > 0) ? 'disabled' : ''}`}
                      style={{ backgroundColor: "#76ABAE", borderColor: "#76ABAE" }}
                      disabled={!quiz.reattempt || quiz.noofattempts > 1}
                    >
                      Attempt Quiz
                    </Link>
                      </div>
                      < Link to= {`/Leaderboard?quizId=${quiz.quizId}`}>
                      <div className={`btn btn-primary btn-sm `}style={{ backgroundColor: "#76ABAE", borderColor: "#76ABAE",
                      position: "absolute", bottom: "10px", right: "170px" }}>
                        Leaderboard
                       </div>
                       </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StudentSub;
