import React, { useState, useEffect } from 'react';
//import {  useLocation } from "react-router-dom";
const styles = {
    container: {
      margin:"4%",
      marginTop:"70px"
    },
    column: {
      float: 'left',
      width: '25%',
      padding: '0 10px',
    },
    row: {
      margin: '0 -5px',
    },
    card: {
      padding: '16px',
      textAlign: 'center',
      backgroundColor:'#76ABAE',
      height:"120px",
      borderRadius:"15px"
    },
    body: {
        color:"#FFFFFF"
    },
    tablehead: {
        backgroundColor:"#EEEEEE",
        height:"4rem"
    },
    tablebody: {
        backgroundColor:"#F7FCFC"
    }
  };
  
function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState({
        leaderboard: [],
        statistics: {}
      });
    
      useEffect(() => {
        const fetchLeaderboardData = async () => {
          try {
            const quizId = new URLSearchParams(window.location.search).get("quizId");
            const response = await fetch(`http://localhost:3000/leaderboardRoutes?quizId=${quizId}`); 
            if (!response.ok) {
              throw new Error('Failed to fetch leaderboard data');
            }
            const data = await response.json();
            setLeaderboardData(data);
          } catch (error) {
            console.error('Error fetching leaderboard:', error);
          }
        };
    
        fetchLeaderboardData();
      }, []); 
    
      const { leaderboard, statistics } = leaderboardData;
    
    return (
        <div style={styles.container}>
          <div style={styles.row}>
            <div style={styles.column}>
              <div style={styles.card}>
                <div style={styles.body}>
                  <h2>{statistics.numberOfParticipants}</h2>
                  <h5>PARTICIPANTS</h5>
                </div>
              </div>
            </div>
      
            <div style={styles.column}>
              <div style={styles.card}>
                <div style={styles.body}>
                  <h2>{statistics.averageScore}</h2>
                  <h5>AVERAGE SCORE</h5>
                </div>
              </div>
            </div>
      
            <div style={styles.column}>
              <div style={styles.card}>
                <div style={styles.body}>
                  <h2>{statistics.highestScore}/{statistics.totalMarks}</h2>
                  <h5>HIGHEST SCORE</h5>
                </div>
              </div>
            </div>
      
            <div style={styles.column}>
              <div style={styles.card}>
                <div style={styles.body}>
                  <h2>{statistics.participantsWithHighestScore}</h2>
                  <h5>PARTICIPANTS WITH HIGHEST SCORE</h5>
                </div>
              </div>
            </div>
          </div>
      
          <div style={styles.row}>
            <h2 style={{ paddingTop: "10rem", paddingBottom: "2rem", color: "#222831" }}>LEADERBOARD</h2>
          </div>
          <table className="" style={{ width: "100%" }}>
            <thead style={styles.tablehead}>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
                <th scope="col">Time Taken</th>
              </tr>
            </thead>
            <tbody style={styles.tablebody}>
              {leaderboard.map((participant, index) => (
                <tr key={index} style={{ height: "3rem" }}>
                  <th scope="row">{index + 1}</th>
                  <td>{participant.studentName}</td>
                  <td>{participant.score}</td>
                  <td>{participant.timeTaken} minutes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
};
export default Leaderboard