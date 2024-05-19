import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Subject() {
  const [subname, setSubname] = useState("");

  useEffect(() => {
    const location = window.location;
    const subjectId = new URLSearchParams(location.search).get("subjectId");
    localStorage.setItem("subId", subjectId);
    if (subjectId) {
      fetchSubjectName(subjectId);
    }
  }, []);

  const fetchSubjectName = (id) => {
    fetch(`http://localhost:3000/subject/name?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch subject");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Subject Name:", data.name);
        localStorage.setItem("subjectname", data.name);
        setSubname(data.name);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  };

  return (
    <div className="Scontainer" style={{ marginTop: "70px", padding: "5%" }}>
      <h1 style={{ color: "#212529" }}>{subname}</h1>

      <div className="card-container" style={{ paddingTop: "5%" }}>
        {["1", "2", "3"].map((level) => (
          <div className="card-wrapper" key={level}>
            <Link
              to={`/LevelPage?level=${level}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card" style={cardStyle}>
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="card-title">Level {level}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  height: "200px",
  backgroundColor: "#76ABAE",
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFFFFF",
  transition: "transform 0.2s",
};

const cardContainerStyle = `
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .card-wrapper {
    flex: 1 1 300px;
    max-width: 350px;
    margin: 10px;
  }

  .card-wrapper .card:hover {
    transform: scale(1.05);
  }

  .card-title {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    .card-title {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 576px) {
    .card-title {
      font-size: 1rem;
    }
  }
`;

const styleElement = document.createElement("style");
styleElement.textContent = cardContainerStyle;
document.head.append(styleElement);

export default Subject;
