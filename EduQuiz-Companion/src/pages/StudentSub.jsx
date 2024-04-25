import "../styles.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
function StudentSub() {
  const [activeLevel, setActiveLevel] = useState(null);
  const list = [
    "Quiz 1 details",
    "Quiz 2 details",
    "Quiz 3 details",
    "Quiz 4 details",
  ];
  const Levelno = "1";
  const handleLevelClick = (level) => {
    setActiveLevel(level);
  };
  return (
    <>
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
                            to="#"
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
                            to="#"
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
                            to="#"
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
    </>
  );
}
export default StudentSub;