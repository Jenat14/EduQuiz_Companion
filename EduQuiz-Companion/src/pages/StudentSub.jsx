import "../styles.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
function StudentSub() {
  const [subname, setSubname] = useState("");
  const [activeLevel, setActiveLevel] = useState(null);
  const [quizNames, setQuizNames] = useState([]);
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
        console.log("Subject Name:", data.name);
        setSubname(data.name);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  };
  const handleLevelClick = (level) => {
    setActiveLevel(level);
    // Fetch quiz names for the selected subject and level
    fetchQuizNames(level);
  };
  
  const fetchQuizNames = (level) => {
    
    console.log(level)
    const subjectId = new URLSearchParams(window.location.search).get("subjectId");
    console.log("subid")
    console.log(subjectId)
    fetch('http://localhost:3000/quizName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subjectId, level }),
      
    })
   
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quiz names");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Quiz Names:", data.quizNames);
        const sortedQuizNames = data.quizNames.sort(); // Sort the quizNames array
        setQuizNames(sortedQuizNames);
      })
      .catch((error) => {
        console.error("Error fetching quiz names:", error);
        setError('Failed to fetch quiz names');
      });
  };

  
  return (
    <>
      <div style={{marginTop:"70px"}}>
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
            onClick={() => handleLevelClick("1")}
          >
            Level 1
          </button>
          <button
            type="button"
            className={`btn btn-lg ${activeLevel === "level2" ? "active" : ""}`}
            onClick={() => handleLevelClick("2")}
          >
            Level 2
          </button>
          <button
            type="button"
            className={`btn btn-lg ${activeLevel === "level3" ? "active" : ""}`}
            onClick={() => handleLevelClick("3")}
          >
            Level 3
          </button>
        </div>
        {activeLevel && (
          <div className="level-click">
            {quizNames.map((quizName, index) => (
              <div
                className="card mb-3 shadow-bottom"
                style={{
                  height: "150px",
                  width: "68rem",
                  backgroundColor: "#EEEEEE",
                  borderColor: "#76ABAE",
                  margin: "20px auto"
                }}
                key={index}
              >
                <div className="card-body d-flex flex-column align-items-center justify-content-between">
                  <h5 className="card-title" style={{ color: "#222831" }}>
                    {quizName}
                  </h5>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    <Link
                      to={`/Question?quiz=${quizName}`}
                      className="btn btn-primary btn-sm"
                      style={{
                        backgroundColor: "#76ABAE",
                        borderColor: "#76ABAE",
                      }}
                    >
                      Attempt Quiz
                    </Link>
                  </div>
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
