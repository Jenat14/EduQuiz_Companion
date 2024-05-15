import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Facultydash.css";

const Facultydash = () => {
  const [subjects, setSubjects] = useState([]);
  const id = localStorage.getItem("Id");
  const role = id && id.startsWith("F") ? "faculty" : "student";
  localStorage.setItem("role", role);
  const [showForm, setShowForm] = useState(false);
  const [newSubject, setNewSubject] = useState({
    id: "",
    Name: "",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/eduquiz-companion.appspot.com/o/subimage.jpeg?alt=media&token=442d98be-baeb-43df-8b09-f2031a99fceb",
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/subject/subjects");
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const generateSubjectId = (name) => {
    if (!name) return "";

    const words = name.toUpperCase().split(" ");
    const initials = words.map((word) => word.charAt(0)).join("");
    const randomNumber = Math.floor(Math.random() * 999) + 1;
    const subjectId = `S-${initials}-${randomNumber}`;
    return subjectId;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const subjectId = generateSubjectId(newSubject.Name);

      const response = await fetch("http://localhost:3000/subject/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newSubject, id: subjectId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add subject");
      }

      setNewSubject({
        id: "",
        Name: "",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/eduquiz-companion.appspot.com/o/subimage.jpeg?alt=media&token=442d98be-baeb-43df-8b09-f2031a99fceb",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {!showForm && (
        <div className="container-f">
          <h2>
            <b>FACULTY DASHBOARD</b>
          </h2>
          <button className="top-right-button" onClick={toggleForm}>
            Add New Subject
          </button>
        </div>
      )}
      {showForm && (
        <div className="container d-flex justify-content-center">
          <div
            className="form-floating"
            style={{
              backgroundColor: "#EEEEEE",
              padding: "20px",
              width: "60%",
            }}
          >
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={toggleForm}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "1.5rem",
              }}
            ></button>
            <h3 style={{ color: "#76ABAE", paddingBottom: "20px" }}>
              Add New Subject
            </h3>
            <div className="mb-3">
              <label htmlFor="subjectName" className="form-label">
                Enter Subject Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                aria-describedby="subjectNameHelp"
                value={newSubject.Name}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, Name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subjectName" className="form-label">
                Your Subject Id
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                aria-describedby="subjectNameHelp"
                value={generateSubjectId(newSubject.Name)}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Add an Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                name="formFile"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#76ABAE",
                color: "white",
                border: "none",
              }}
              onClick={handleSubmit}
            >
              Add Subject
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <div className="card-container-f">
          {subjects.map((subject) => (
            <div key={subject.id} className="card-f">
              <Link
                to={{
                  pathname: "/Subject",
                  search: `?subjectId=${subject.id}`,
                }}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={subject.data.imageUrl}
                  alt={subject.data.Name}
                  className="card-image-f"
                />
                <div className="card-content-f">
                  <button className="card-button">
                    <b>{subject.data.Name}</b>
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Facultydash;
