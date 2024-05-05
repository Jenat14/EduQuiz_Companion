import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LevelPage() {
    const data={};
    const [quizNames, setQuizNames] = useState([]);
    const [counter, setCounter] = useState(0); // Initialize counter variable
    const level = new URLSearchParams(window.location.search).get("level");

    useEffect(() => {
        // Get the level value from the URL parameter and store it in local storage
        if (level) {
          localStorage.setItem('level', level);
        }

        // Function to fetch quizzes
        const fetchQuizzes = async (subjectId, level) => {
            try {
                // Make a POST request to the backend endpoint
                const response = await fetch('http://localhost:3000/quizName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ subjectId, level }),
                });

                // Check if the response is OK (status code 200)
                if (!response.ok) {
                    throw new Error('Failed to fetch quizzes');
                }

                // Parse the JSON response
                const data = await response.json();
                const sortedQuizNames = data.quizNames.sort((a, b) => a.localeCompare(b));
                // Set the quiz names in the state
                setQuizNames(sortedQuizNames);
                setCounter(sortedQuizNames.length);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                // Handle errors
            }
        };
        const subjectId = localStorage.getItem("subId");
        if (subjectId && level) {
            fetchQuizzes(subjectId, level);
        }
    }, [level]);
    localStorage.setItem("quiznum",counter+1);
    console.log((localStorage.getItem("quiznum")))

    return (
        <div style={{ marginTop: "70px", padding: "5%" }}>
            <div className="row">
                <div className="col-md-6 ">
                    <h2 style={{ margin: 0, color: "#222831" }}>LEVEL {level}</h2>
                </div>
                <div className="col-md-6 d-grid d-md-flex justify-content-md-end">
                    <Link to="/PageLayout">
                        <button className="btn btn-primary" style={{ borderRadius: "25px", backgroundColor: "#76ABAE", border: "1px solid #76ABAE", color: "#FFFDFD", width: "200px" }}>
                            <h6>Add New Quiz</h6>
                        </button>
                    </Link>
                </div>
            </div>
            {/*correct here*/}
            <div style={{ padding: "5%" }}>
                {quizNames.map((quiz, index) => (
                    <Link to={{
                        pathname: `/LeadView`,
                        search: `?quiz=${encodeURIComponent(JSON.stringify(quiz))}`,
                        state: { data } // Add your state variable here
                      }}
                      style={{ textDecoration: 'none' }} key={index}>
                        <div className="card mb-3 shadow-bottom" style={{ width: "70rem", backgroundColor: "#EEEEEE", borderColor: "#76ABAE" }}>
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <h5 className="card-title" style={{ color: "#222831" }}>{quiz}</h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default LevelPage;
