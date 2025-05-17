import React, { useState } from "react";

function SimulationResults({ result }) {
  const [currentRound, setCurrentRound] = useState(0);
  const roundsCount = result.computer_choices.length;

  // Color constants
  const seekerColor = "#FF5252"; // red
  const hiderColor = "#448AFF"; // blue
  const tableBg = "#2A313A";
  const borderColor = "#3A404C";
    
  return (
    <div
      style={{
        fontFamily: "'Special Gothic Expanded One', sans-serif",
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
        Round {currentRound + 1} / {roundsCount}
      </h2>
      <table
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
          width: "280px",
          backgroundColor: tableBg,
          borderRadius: "8px",
          overflow: "hidden",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <thead>
          <tr>
            {["Detail", "Value"].map((header) => (
              <th
                key={header}
                style={{
                  borderBottom: `2px solid ${borderColor}`,
                  padding: "10px 0",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: seekerColor }}>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              Computer Choice
            </td>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              {result.computer_choices[currentRound]}
            </td>
          </tr>
          <tr style={{ color: hiderColor }}>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              Player Choice
            </td>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              {result.player_choices[currentRound]}
            </td>
          </tr>
          <tr style={{ color: "#fff" }}>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              Winner
            </td>
            <td
              style={{
                color:
                  result.winners[currentRound] === "hider"
                    ? "#448AFF" // blue
                    : result.winners[currentRound] === "seeker"
                    ? "#FF5252" // red
                    : "#888888", // gray for draw
                padding: "8px",
                borderBottom: "1px solid #3A404C",
                textAlign: "center",
              }}
            >
              {result.winners[currentRound]}
            </td>
          </tr>
          <tr style={{ color: hiderColor }}>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              Hider Payoff
            </td>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              {result.hiders_payoffs[currentRound].toFixed(2)}
            </td>
          </tr>
          <tr style={{ color: seekerColor }}>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              Seeker Payoff
            </td>
            <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              {result.seekers_payoffs[currentRound].toFixed(2)}
            </td>
          </tr>
          <tr style={{ color: "#fff" }}>
            <td style={{ padding: "10px" }}>Proximity</td>
            <td style={{ padding: "10px" }}>
              {result.proximities[currentRound]}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={() => setCurrentRound(Math.max(currentRound - 1, 0))}
          disabled={currentRound === 0}
          style={{
            cursor: currentRound === 0 ? "not-allowed" : "pointer",
            padding: "10px 20px",
            backgroundColor: currentRound === 0 ? "#555" : "#448AFF",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (currentRound !== 0)
              e.currentTarget.style.backgroundColor = "#3366FF";
          }}
          onMouseLeave={(e) => {
            if (currentRound !== 0)
              e.currentTarget.style.backgroundColor = "#448AFF";
          }}
        >
          Previous
        </button>

        <button
          onClick={() =>
            setCurrentRound(Math.min(currentRound + 1, roundsCount - 1))
          }
          disabled={currentRound === roundsCount - 1}
          style={{
            cursor:
              currentRound === roundsCount - 1 ? "not-allowed" : "pointer",
            padding: "10px 20px",
            backgroundColor:
              currentRound === roundsCount - 1 ? "#555" : "#FF5252",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (currentRound !== roundsCount - 1)
              e.currentTarget.style.backgroundColor = "#E04343";
          }}
          onMouseLeave={(e) => {
            if (currentRound !== roundsCount - 1)
              e.currentTarget.style.backgroundColor = "#FF5252";
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SimulationResults;
