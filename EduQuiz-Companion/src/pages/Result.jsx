import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../styles.css'; 
import { Link } from "react-router-dom";
const Result = ({ data }) => {
  const chartData = {
    labels: ['Score', 'Correct Answers', 'Incorrect Anwers', 'Attempted Questions'],
    datasets: [
      {
        label: 'Result',
        data: data || [50, 30, 20, 40], 
        backgroundColor: ['#222831', '#4A9094', '#60BCC1', '#76ABAE'],
      },
    ],
  };

  const chartRef = useRef(null);

  useEffect(() => {
    const config = {
      type: 'doughnut',
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
  }, [chartData]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h1>RESULTS</h1>
            <div className="chart-container" style={{ width: '200px', height: '200px', margin: 'auto' }}>
              <canvas ref={chartRef} />
            </div>
            <div className="mt-4">
              {chartData.datasets && chartData.datasets.length > 0 && (
                chartData.labels.map((label, index) => (
                  <div key={index} className="label-item">
                    <span className="badge" style={{ color: chartData.datasets[0].backgroundColor[index], fontSize:"20px"}}>
                      {label}:
                    </span>
                    <span style={{ color: chartData.datasets[0].backgroundColor[index], fontSize:"20px"}}>{chartData.datasets[0].data[index]}</span>
                  </div>
                ))
              )}
            </div>
            <div className="button-container">
              <Link to="#" className="btn mt-4" style={{ backgroundColor: '#76ABAE', color: '#ffffff'}}>
                View Questions
              </Link>
              <Link to="#" className="btn mt-4" style={{ backgroundColor: '#76ABAE', color: '#ffffff' }}>
                Retry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;