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

      <div
        className="row row-cols-1 row-cols-md-3 g-4"
        style={{ paddingTop: "5%" }}
      >
        <div className="col">
          <Link to="/LevelPage?level=1" style={{ textDecoration: "none" }}>
            <div
              className="card "
              style={{
                height: "200px",
                width: "350px",
                backgroundColor: "#76ABAE",
                borderRadius: "25px",
              }}
            >
              <div className="card-body d-flex align-items-center justify-content-center">
                <h5 className="card-title" style={{ color: "#FFFFFF" }}>
                  Level 1
                </h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            to={{ pathname: "/LevelPage", search: "?level=2" }}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card"
              style={{
                height: "200px",
                width: "350px",
                backgroundColor: "#76ABAE",
                borderRadius: "25px",
              }}
            >
              <div className="card-body d-flex align-items-center justify-content-center">
                <h5 className="card-title" style={{ color: "#FFFFFF" }}>
                  Level 2
                </h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to="/LevelPage?level=3" style={{ textDecoration: "none" }}>
            <div
              className="card"
              style={{
                height: "200px",
                width: "350px",
                backgroundColor: "#76ABAE",
                borderRadius: "25px",
              }}
            >
              <div className="card-body d-flex align-items-center justify-content-center">
                <h5 className="card-title" style={{ color: "#FFFFFF" }}>
                  Level 3
                </h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subject;
