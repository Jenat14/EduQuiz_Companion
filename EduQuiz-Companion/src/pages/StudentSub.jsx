import "../styles.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
function StudentSub() {
  
  useEffect(() => {

    const location = window.location;
    const subjectId = new URLSearchParams(location.search).get("subjectId");
    console.log("subid",subjectId);
    if (subjectId) {
      fetchSubjectName(subjectId);
    }
  }, []);

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
    console.log("id",id);
    fetch(`http://localhost:3000/subject?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch subject");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Subject Name:", data.name);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  };

  const [activeLevel, setActiveLevel] = useState(null);
  const list = [
    "Quiz 1 details",
    "Quiz 2 details",
    "Quiz 3 details",
    "Quiz 4 details",
  ];

  const handleLevelClick = (level) => {
    setActiveLevel(level);
  };

  
  return (
    <>
      <div style={{marginTop:"70px"}}>
        <h1 style={{ textAlign: "center", color: "#222831" }}>Subject</h1>
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
            onClick={() => handleLevelClick("level1")}
          >
            Level 1
          </button>
          <button
            type="button"
            className={`btn btn-lg ${activeLevel === "level2" ? "active" : ""}`}
            onClick={() => handleLevelClick("level2")}
          >
            Level 2
          </button>
          <button
            type="button"
            className={`btn btn-lg ${activeLevel === "level3" ? "active" : ""}`}
            onClick={() => handleLevelClick("level3")}
          >
            Level 3
          </button>
        </div>
        {activeLevel && (
          <div className="level-click">
            {activeLevel === "level1" && (
              <div className="level-content">
                <div>
                  {list.map((quiz, index) => (
                    <Link to="" style={{ textDecoration: "none" }}>
                      <div
                        className="card mb-3 shadow-bottom"
                        style={{
                          height: "150px",
                          width: "68rem",
                          backgroundColor: "#EEEEEE",
                          borderColor: "#76ABAE",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <div className="card-body d-flex flex-column align-items-center justify-content-between">
                          <h5 className="card-title" style={{ color: "#222831" }}>
                            {quiz}
                          </h5>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                            }}
                          >
                            <Link
                              to="/Question"
                              type="button"
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
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeLevel === "level2" && (
              <div className="level-content">
                <div>
                  {list.map((quiz, index) => (
                    <Link to="" style={{ textDecoration: "none" }}>
                      <div
                        className="card mb-3 shadow-bottom"
                        style={{
                          height: "150px",
                          width: "68rem",
                          backgroundColor: "#EEEEEE",
                          borderColor: "#76ABAE",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <div className="card-body d-flex flex-column align-items-center justify-content-between">
                          <h5 className="card-title" style={{ color: "#222831" }}>
                            {quiz}
                          </h5>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                            }}
                          >
                            <Link
                              to="/Question"
                              type="button"
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
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeLevel === "level3" && (
              <div className="level-content">
                <div>
                  {list.map((quiz, index) => (
                    <Link to="" style={{ textDecoration: "none" }}>
                      <div
                        className="card mb-3 shadow-bottom"
                        style={{
                          height: "150px",
                          width: "68rem",
                          backgroundColor: "#EEEEEE",
                          borderColor: "#76ABAE",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <div className="card-body d-flex flex-column align-items-center justify-content-between">
                          <h5 className="card-title" style={{ color: "#222831" }}>
                            {quiz}
                          </h5>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                            }}
                          >
                            <Link
                              to="/Question"
                              type="button"
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
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default StudentSub;
