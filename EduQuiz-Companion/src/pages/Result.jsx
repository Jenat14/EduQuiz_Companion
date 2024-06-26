import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import "../styles.css";
import { Link } from "react-router-dom";
import noResultImage from "../assets/no result.png";

const Result = ({ data }) => {
  const selectedOptions = localStorage.getItem("selectedOptions");
  console.log(selectedOptions);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    score,
    correctAnswers,
    incorrectAnswers,
    attemptedQuestions,
    finishTimestamp,
  } = location.state;
  //setting the result chart
  const chartData = {
    labels: [
      "Score",
      "Correct Answers",
      "Incorrect Answers",
      "Attempted Questions",
    ],
    datasets: [
      {
        label: "Result",
        data: data || [
          score,
          correctAnswers,
          incorrectAnswers,
          attemptedQuestions,
        ],
        backgroundColor: ["#4A9094", "#76ABAE", "#212529", "#60BCC1"],
      },
    ],
  };
  const chartRef = useRef(null);
  const quizname = localStorage.getItem("quizname");
  const reattempt = localStorage.getItem("reattempt") === "true";
  //prevent the user from pressing back button to navigate to this page
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
  //chart
  useEffect(() => {
    if (attemptedQuestions > 0) {
      const config = {
        type: "doughnut",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      };
      const chartInstance = new Chart(chartRef.current, config);

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartData, attemptedQuestions]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="container full-screen" style={{ marginTop: "70px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h1>RESULTS</h1>
            {attemptedQuestions > 0 ? (
              <>
                <div
                  className="chart-container"
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                >
                  <canvas ref={chartRef} />
                </div>
                <div className="mt-4">
                  {chartData.datasets &&
                    chartData.datasets.length > 0 &&
                    chartData.labels.map((label, index) => (
                      <div key={index} className="label-item">
                        <span
                          className="badge"
                          style={{
                            color: chartData.datasets[0].backgroundColor[index],
                            fontSize: "20px",
                          }}
                        >
                          {label}:
                        </span>
                        <span
                          style={{
                            color: chartData.datasets[0].backgroundColor[index],
                            fontSize: "20px",
                          }}
                        >
                          {chartData.datasets[0].data[index]}
                        </span>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="no-result-container">
                {/*shows if no questions are attempted*/}
                <img
                  src={noResultImage}
                  alt="No Result Found"
                  className="no-result-image"
                  style={{ width: "250px" }}
                />
                <p
                  className="no-result-text"
                  style={{
                    color: "#76abae",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  You haven't attempted any Questions
                </p>
              </div>
            )}
            <div className="button-container">
              <button
                className="btn mt-4"
                style={{ backgroundColor: "#76ABAE", color: "#ffffff" }}
                onClick={() =>
                  navigate(
                    `/LeadView?quiz=${encodeURIComponent(
                      JSON.stringify(quizname)
                    )}`,
                    { state: { selectedOptions } }
                  )
                }
              >
                View Questions
              </button>
              <button
                className={`btn mt-4 ${!reattempt ? "disabled" : ""}`}
                style={{ backgroundColor: "#76ABAE", color: "#ffffff" }}
                onClick={() =>
                  navigate(
                    `/Question?quiz=${encodeURIComponent(
                      JSON.stringify(quizname)
                    )}`
                  )
                }
                disabled={!reattempt}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
