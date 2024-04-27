
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
  const participantsCount =70;
  const averageScore=75;
  const highestScore=90;
  const totalScore=100;
  const participantsWithHighestScore=3;
function Leaderboard() {
    const participants = [
        { name: "John Doe", score: 95, timetaken: 1 },
        { name: "Jane Smith", score: 90, timetaken: 2 },
        { name: "Alice Johnson", score: 85, timetaken: 3 },
    ];
    
    return(
        <div style={styles.container}>
            <div >
            <div style={styles.row}>
                <div style={styles.column}>
                <div style={styles.card}>
                    <div style={styles.body}>
                    <h2>{participantsCount}</h2>
                    <h5>PARTICIPANTS</h5>
                    </div>
                </div>
                </div>

                <div style={styles.column}>
                <div style={styles.card}>
                    <div style={styles.body}>
                    <h2>{averageScore}</h2>
                    <h5>AVERAGE SCORE</h5>
                    </div>
                </div>
                </div>

                <div style={styles.column}>
                <div style={styles.card}>
                    <div style={styles.body}>   
                    <h2>{highestScore}/{totalScore}</h2>
                    <h5>HIGHEST SCORE</h5>
                    </div>
                </div>
                </div>

                <div style={styles.column}>
                <div style={styles.card}>
                    <div style={styles.body}>
                    <h2>{participantsWithHighestScore}</h2>
                    <h5>PARTICIPANTS WITH HIGHEST SCORE</h5>
                    </div>
                </div>
                </div>
                </div>
                </div>
                <div style={styles.row}>
                <h2 style={{paddingTop:"10rem",paddingBottom:"2rem",color:"#222831" }}>LEADERBOARD</h2>
            </div>
                <table className="" style={{ width: "100%"}} >
                <thead style={styles.tablehead}>
                    <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                    <th scope="col">Time Taken</th>
                    </tr>
                </thead>
                <tbody style={styles.tablebody}>
                    {participants.map((participant, index) => (
                    <tr key={index} style={{height:"3rem"}} >
                        <th scope="row">{index + 1}</th>
                        <td>{participant.name}</td>
                        <td>{participant.score}</td>
                        <td>{participant.timetaken}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                
        </div>
    );

};
export default Leaderboard