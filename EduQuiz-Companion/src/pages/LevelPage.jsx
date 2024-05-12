import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LevelPage() {
  const [quizNames, setQuizNames] = useState([]);
  const [counter, setCounter] = useState(0);
  const level = new URLSearchParams(window.location.search).get("level");

  useEffect(() => {
    if (level) {
      localStorage.setItem("level", level);
    }
    const fetchQuizzes = async (subjectId, level) => {
      try {
        const response = await fetch("http://localhost:3000/quizName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subjectId, level }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        const sortedQuizNames = data.quizNames.sort((a, b) =>
          a.localeCompare(b)
        );
        setQuizNames(sortedQuizNames);
        setCounter(sortedQuizNames.length);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    const subjectId = localStorage.getItem("subId");
    if (subjectId && level) {
      fetchQuizzes(subjectId, level);
    }
  }, [level]);
  localStorage.setItem("quiznum", counter + 1);
  console.log(localStorage.getItem("quiznum"));

  return (
    <div style={{ marginTop: "70px", padding: "5%" }}>
      <div className="row">
        <div className="col-md-6 ">
          <h2 style={{ margin: 0, color: "#222831" }}>LEVEL {level}</h2>
        </div>
        <div className="col-md-6 d-grid d-md-flex justify-content-md-end">
          <Link to="/PageLayout">
            <button
              className="btn btn-primary"
              style={{
                borderRadius: "25px",
                backgroundColor: "#76ABAE",
                border: "1px solid #76ABAE",
                color: "#FFFDFD",
                width: "200px",
              }}
            >
              <h6>Add New Quiz</h6>
            </button>
          </Link>
        </div>
      </div>
      <div style={{ padding: "5%" }}>
        {quizNames.map((quiz, index) => (
          <Link
            to={{
              pathname: `/LeadView`,
              search: `?quiz=${encodeURIComponent(JSON.stringify(quiz))}`,
            }}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <div
              className="card mb-3 shadow-bottom"
              style={{
                width: "70rem",
                backgroundColor: "#EEEEEE",
                borderColor: "#76ABAE",
              }}
            >
              <div className="card-body d-flex align-items-center justify-content-center">
                <h5 className="card-title" style={{ color: "#222831" }}>
                  {quiz}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LevelPage;
