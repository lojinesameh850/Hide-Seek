import React, { useState } from "react";

function SimulationResults({ result }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [inputRound, setInputRound] = useState("1");
  const roundsCount = result.computer_choices.length;
  
  // Pagination settings
  // const maxVisiblePages = 7; // Maximum number of page buttons to show

  // Color constants
  const seekerColor = "#FF5252"; // red
  const hiderColor = "#448AFF"; // blue
  const tableBg = "#2A313A";
  const borderColor = "#3A404C";
  
  // Calculate total rounds won by each role
  const hiderWins = result.winners.filter(winner => winner === "hider").length;
  const seekerWins = result.winners.filter(winner => winner === "seeker").length;
  const draws = result.winners.filter(winner => winner === "draw").length;
  
  // Handle direct round input
  const handleRoundInput = (e) => {
    const value = e.target.value;
    setInputRound(value);
    
    const roundNum = parseInt(value);
    if (roundNum >= 1 && roundNum <= roundsCount) {
      setCurrentRound(roundNum - 1);
    }
  };
  
  // Generate pagination buttons
  // const generatePaginationButtons = () => {
  //   const buttons = [];
  //   const currentPage = currentRound + 1;
  //   const totalPages = roundsCount;
    
  //   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  //   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
  //   // Adjust start page if we're near the end
  //   if (endPage - startPage + 1 < maxVisiblePages) {
  //     startPage = Math.max(1, endPage - maxVisiblePages + 1);
  //   }
    
  //   // First page and ellipsis
  //   if (startPage > 1) {
  //     buttons.push(
  //       <button
  //         key={1}
  //         onClick={() => setCurrentRound(0)}
  //         style={{
  //           padding: "8px 12px",
  //           backgroundColor: currentPage === 1 ? "#448AFF" : "#555",
  //           color: "#fff",
  //           border: "none",
  //           borderRadius: "4px",
  //           cursor: "pointer",
  //           margin: "0 2px",
  //           fontSize: "12px",
  //         }}
  //       >
  //         1
  //       </button>
  //     );
      
  //     if (startPage > 2) {
  //       buttons.push(
  //         <span key="ellipsis1" style={{ color: "#fff", margin: "0 5px" }}>
  //           ...
  //         </span>
  //       );
  //     }
  //   }
    
  //   // Page buttons
  //   for (let i = startPage; i <= endPage; i++) {
  //     buttons.push(
  //       <button
  //         key={i}
  //         onClick={() => setCurrentRound(i - 1)}
  //         style={{
  //           padding: "8px 12px",
  //           backgroundColor: currentPage === i ? "#448AFF" : "#555",
  //           color: "#fff",
  //           border: "none",
  //           borderRadius: "4px",
  //           cursor: "pointer",
  //           margin: "0 2px",
  //           fontSize: "12px",
  //           fontWeight: currentPage === i ? "bold" : "normal",
  //         }}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }
    
  //   // Last page and ellipsis
  //   if (endPage < totalPages) {
  //     if (endPage < totalPages - 1) {
  //       buttons.push(
  //         <span key="ellipsis2" style={{ color: "#fff", margin: "0 5px" }}>
  //           ...
  //         </span>
  //       );
  //     }
      
  //     buttons.push(
  //       <button
  //         key={totalPages}
  //         onClick={() => setCurrentRound(totalPages - 1)}
  //         style={{
  //           padding: "8px 12px",
  //           backgroundColor: currentPage === totalPages ? "#448AFF" : "#555",
  //           color: "#fff",
  //           border: "none",
  //           borderRadius: "4px",
  //           cursor: "pointer",
  //           margin: "0 2px",
  //           fontSize: "12px",
  //         }}
  //       >
  //         {totalPages}
  //       </button>
  //     );
  //   }
    
  //   return buttons;
  // };
    
  return (
    <div
      style={{
        fontFamily: "'Special Gothic Expanded One', sans-serif",
        color: "#fff",
      }}
    >
      {/* Total Summary Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
          Total Summary
        </h2>
        <table
          style={{
            marginBottom: "20px",
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
              <th
                style={{
                  borderBottom: `2px solid ${borderColor}`,
                  padding: "10px 0",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Role
              </th>
              <th
                style={{
                  borderBottom: `2px solid ${borderColor}`,
                  padding: "10px 0",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Rounds Won
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: hiderColor }}>
              <td
                style={{
                  padding: "10px",
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                Hider
              </td>
              <td
                style={{
                  padding: "10px",
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                {hiderWins}
              </td>
            </tr>
            <tr style={{ color: seekerColor }}>
              <td
                style={{
                  padding: "10px",
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                Seeker
              </td>
              <td
                style={{
                  padding: "10px",
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                {seekerWins}
              </td>
            </tr>
            {draws > 0 && (
              <tr style={{ color: "#888888" }}>
                <td
                  style={{
                    padding: "10px",
                  }}
                >
                  Draws
                </td>
                <td
                  style={{
                    padding: "10px",
                  }}
                >
                  {draws}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Individual Round Details */}
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "10px" }}>
          Round {currentRound + 1} / {roundsCount}
        </h2>
        
        {/* Direct Round Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px", color: "#fff" }}>
            Go to round:
          </label>
          <input
            type="number"
            min="1"
            max={roundsCount}
            value={inputRound}
            onChange={handleRoundInput}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              border: "1px solid #555",
              backgroundColor: "#2A313A",
              color: "#fff",
              width: "80px",
              textAlign: "center",
            }}
          />
        </div>
      </div>
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

      {/* Navigation Controls */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* Previous/Next Buttons */}
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => {
              const newRound = Math.max(currentRound - 1, 0);
              setCurrentRound(newRound);
              setInputRound((newRound + 1).toString());
            }}
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
            onClick={() => {
              const newRound = Math.min(currentRound + 1, roundsCount - 1);
              setCurrentRound(newRound);
              setInputRound((newRound + 1).toString());
            }}
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
        
        {/* Pagination */}
        {/* {roundsCount > 5 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              maxWidth: "400px",
            }}
          >
            {generatePaginationButtons()}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default SimulationResults;