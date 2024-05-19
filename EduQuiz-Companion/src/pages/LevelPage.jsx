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
          b.localeCompare(a)
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

  const headerRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };

  const levelTitleStyle = {
    flex: 1,
    color: '#212529',
    margin: 0,
  };

  const addButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '80%',
    marginTop: '10px',
  };

  const addButtonStyle = {
    borderRadius: '25px',
    backgroundColor: '#76ABAE',
    border: '1px solid #76ABAE',
    color: '#FFFFFF',
    width: '200px',
  };

  const quizzesContainerStyle = {
    padding: '5%',
  };

  const quizLinkStyle = {
    textDecoration: 'none',
    width: '100%',
    maxWidth: '350px',
  };

  const quizCardStyle = {
    backgroundColor: '#EEEEEE',
    borderColor: '#76ABAE',
    marginBottom: '20px',
    transition: 'transform 0.2s',
  };

  const cardTitleStyle = {
    color: '#212529',
    textAlign: 'center',
  };

  return (
    <div style={{ marginTop: "70px", padding: "5%" }}>
      <div style={headerRowStyle}>
        <h2 style={levelTitleStyle}>LEVEL {level}</h2>
        <div style={addButtonContainerStyle}>
          <Link to="/PageLayout">
            <button className="btn btn-primary" style={addButtonStyle}>
              <h6>Add New Quiz</h6>
            </button>
          </Link>
        </div>
      </div>
      <div style={quizzesContainerStyle}>
        {quizNames.map((quiz, index) => (
          <Link
            to={{
              pathname: `/LeadView`,
              search: `?quiz=${encodeURIComponent(JSON.stringify(quiz))}`,
            }}
            style={quizLinkStyle}
            key={index}
          >
            <div className="card mb-3 shadow-bottom" style={quizCardStyle}>
              <div className="card-body d-flex align-items-center justify-content-center">
                <h5 className="card-title" style={cardTitleStyle}>{quiz}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LevelPage;
