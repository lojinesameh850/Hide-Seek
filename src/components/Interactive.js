import React, { useEffect, useState } from "react";
import { Textarea, Button, Select, Option } from "@mui/joy";
import generateHideoutGrid from "./gridHelper";
import PayoffMatrixDisplay from "./payoffHelper";
import GenerateHideoutGrid from "./gridHelper";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
function InteractiveForm() {
  const [numHideouts, setNumHideouts] = useState(2);
  const [userRole, setUserRole] = useState("hider");
  const [worldType, setWorldType] = useState("Linear (1D)");
  const [result, setResult] = useState(null);
  const [hideouts, setHideouts] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(-1);
  const [generateGrid, setGenerateGrid] = useState(false); // controls when to show grid
  const [payoffMatrixDisplay, setPayoffMatrixDisplay] = useState(false); // controls when to show payoff matrix
  const [PayOffMatrix, setpayoffMatrix] = useState([]);
  const [seekerScore, setSeekerScore] = useState(0);
  const [hiderScore, setHiderScore] = useState(0);
  // const hideouts = generateHideoutGrid({ numHideouts });
  // const payoffMatrix = generatePayoffMatrix(hideouts);
  // useEffect(() => {
  //   console.log(PayOffMatrix);
  // }, [PayOffMatrix]);

  
  useEffect(() => {
    setGenerateGrid(true);
    setPayoffMatrixDisplay(true);
    generatePayoffMatrix(hideouts);
  }, [hideouts]);
  // useEffect(() => {
  //   console.log(playerChoice);
  // }, [playerChoice]);
  useEffect(() => {
    console.log(payoffMatrixDisplay);
  }, [payoffMatrixDisplay]);
  useEffect(() => {
    if (result) {
      setSeekerScore((prev) => result["seeker_payoff"] + prev);
      setHiderScore((prev) => result["hider_payoff"] + prev);
    }
  }, [result]);

  async function sendtoBackend() {
    try {
      if (
        playerChoice === -1 ||
        !PayOffMatrix ||
        !Array.isArray(PayOffMatrix) ||
        (userRole !== "hider" && userRole !== "seeker")
      ) {
        alert("Can't send data");
        return;
      } else {
        const data = {
          human_choice: playerChoice,
          payoff: PayOffMatrix,
          human_role: userRole,
        };
        console.log("Sending to backend:", data);

        const response = await fetch("http://localhost:5000/play", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Simulation result:", result);
        setResult(result);
        // handle result if needed (e.g., update state/UI)
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert("Something went wrong while communicating with the server.");
    }
  }

  function generatePayoffMatrix(hideouts) {
    console.log(hideouts);
    // Ensure hideouts is a valid array
    if (!Array.isArray(hideouts) || hideouts.length === 0) {
      console.log("failed");
      return [];
    }

    // Set both row and column size based on number hideouts
    const size = hideouts.length;
    // Initialize matrix with zeros
    const payoffMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(0));

    // Fill matrix based on hideout types
    for (let i = 0; i < size; i++) {
      const hideoutType = hideouts[i].type;

      for (let j = 0; j < size; j++) {
        if (i === j) {
          // Diagonal entries are always negative (means the seeker found the hider and won)
          switch (hideoutType) {
            case "Easy":
              payoffMatrix[i][j] = -1;
              break;
            case "Neutral":
              payoffMatrix[i][j] = -2;
              break;
            case "Hard":
              payoffMatrix[i][j] = -3;
              break;
            default:
              payoffMatrix[i][j] = -1; // Default case
          }
        } else {
          // Non-diagonal entries (means the hider wasn't found and won, no deduction from hider)
          switch (hideoutType) {
            case "Easy":
              payoffMatrix[i][j] = 3;
              break;
            case "Neutral":
              payoffMatrix[i][j] = 2;
              break;
            case "Hard":
              payoffMatrix[i][j] = 1;
              break;
            default:
              payoffMatrix[i][j] = 1; // Default case
          }
        }
      }
    }
    console.log("heere " + payoffMatrix);
    setpayoffMatrix(payoffMatrix);
  }
  function generateHideouts(count) {
    const types = ["Easy", "Neutral", "Hard"];
    const newHides = [];

    for (let i = 1; i <= count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      newHides.push({ index: i, type });
    }

    setHideouts(newHides);
  }
  const handleGenerateGrid = () => {
    generateHideouts(numHideouts);
    setResult(null)
    setSeekerScore(0)
    setHiderScore(0)
    console.log(numHideouts);
    setGenerateGrid(true); // show the grid when clicked
  };
  const handlePayoffMatrixDisplay = () => {
    setPayoffMatrixDisplay(true); // show the grid when clicked
  };

  return (
    <div
      style={{
        backgroundColor: "#3A404C",
        height: "100%",
        width: "100%",
        color: "#ffffff",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "scroll",
        fontFamily: "Special Gothic Expanded One",
      }}
    >
      {/* Create and visualize world */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Special Gothic Expanded One",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: "Special Gothic Expanded One",
          }}
        >
          <p
            style={{
              justifyContent: "center",
              display: "inline",
              margin: 0,
              fontSize: "25px",
            }}
          >
            Choose your role
          </p>
          <Select
            defaultValue="hider"
            placeholder="Hider"
            value={userRole}
            onChange={(event, userRole) => setUserRole(userRole)}
            style={{
              height: "35px",
              width: "135px",
              fontSize: "20px",
              fontFamily: "Special Gothic Expanded One",
            }}
          >
            <Option
              sx={{ fontFamily: "Special Gothic Expanded One" }}
              value="hider"
            >
              Hider
            </Option>
            <Option
              sx={{ fontFamily: "Special Gothic Expanded One" }}
              value="seeker"
            >
              Seeker
            </Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: "Special Gothic Expanded One",
          }}
        >
          <p
            style={{
              justifyContent: "center",
              display: "inline",
              margin: 0,
              fontSize: "25px",
            }}
          >
            Choose world type
          </p>
          <Select
            defaultValue="linear"
            placeholder="Linear (1D)"
            value={worldType}
            onChange={(event, worldType) => setWorldType(worldType)}
            style={{
              height: "35px",
              width: "170px",
              fontSize: "20px",
              fontFamily: "Special Gothic Expanded One",
            }}
          >
            <Option
              sx={{ fontFamily: "Special Gothic Expanded One" }}
              value="linear"
            >
              Linear (1D)
            </Option>
            <Option
              sx={{ fontFamily: "Special Gothic Expanded One" }}
              value="grid"
            >
              Grid (2D)
            </Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: "Special Gothic Expanded One",
          }}
        >
          <p
            style={{
              justifyContent: "center",
              display: "inline",
              margin: 0,
              fontSize: "25px",
            }}
          >
            Enter size of world
          </p>
          <Textarea
            type="number"
            variant="soft"
            sx={{
              justifyContent: "center",
              fontFamily: "Special Gothic Expanded One",
              width: "90px",
              height: "30px",
              fontSize: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              padding: "2px 8px",
            }}
            minRows={1}
            maxRows={1}
            defaultValue={2}
            placeholder="2"
            value={numHideouts}
            onChange={(e) => {
              setNumHideouts(Number(e.target.value));
              setGenerateGrid(false); // reset visibility if size is changed
              setPayoffMatrixDisplay(false);
            }}
          />
        </div>
        <div
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px", // space between buttons
          }}
        >
          <Button
            sx={{
              fontFamily: "Special Gothic Expanded One",
              backgroundColor: "#EC407A",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#D12366" },
              "&:active": { backgroundColor: "#B01F5D" },
            }}
            variant="solid"
            onClick={async () => {
              await handleGenerateGrid();
            }}
          >
            Create World
          </Button>

          {payoffMatrixDisplay && (
            <Button
              sx={{
                fontFamily: "Special Gothic Expanded One",
                backgroundColor: "#EC407A",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#D12366" },
                "&:active": { backgroundColor: "#B01F5D" },
              }}
              variant="solid"
              onClick={async () => {
                sendtoBackend();
              }}
            >
              Play Round
            </Button>
          )}
        </div>

        {/* {generateGrid && payoffMatrixDisplay && (
          <>
            <div
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {generateHideoutGrid({ count: numHideouts })}
            </div>
            <div
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <PayoffMatrixDisplay matrix={payoffMatrix} />
            </div>
          </>
        )} */}
        {generateGrid && (
  <div
    style={{
      marginTop: "15px",
      marginBottom: "15px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    <Box sx={{ flexGrow: 1, backgroundColor: "#2A313A" }}>
      <Grid
        container
        sx={{
          "--Grid-borderWidth": "6px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "#3A404C",
          borderRadius: 12,
          overflow: "hidden",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "#3A404C",
          },
        }}
      >
        {hideouts.map((location) => {
          const isPlayerBlock = playerChoice === location.index;
          const isComputerBlock = result && result.computer_choice === location.index;

          const playerIsHider = userRole === "hider";
          const playerIsSeeker = userRole === "seeker";

          let backgroundColor = "transparent";
          let boxShadow = "none";

          if (result) {
            const playerCaught = playerIsHider && result.winner === "seeker";
            const playerFound = playerIsSeeker && result.winner === "seeker";
            const playerEscaped = playerIsHider && result.winner === "hider";
            const playerMissed = playerIsSeeker && result.winner === "hider";

            if (playerCaught && isPlayerBlock) {
              boxShadow = "0 0 12px 4px red inset";
              backgroundColor = "#5a0000";
            } else if (playerFound && isPlayerBlock) {
              boxShadow = "0 0 12px 4px limegreen inset";
              backgroundColor = "#004d00";
            } else if (playerEscaped) {
              if (isPlayerBlock) {
                boxShadow = "0 0 12px 4px limegreen inset";
                backgroundColor = "#004d00";
              } else if (isComputerBlock) {
                boxShadow = "0 0 8px 2px white inset";
                backgroundColor = "#ffffff33";
              }
            } else if (playerMissed) {
              if (isPlayerBlock) {
                boxShadow = "0 0 12px 4px red inset";
                backgroundColor = "#5a0000";
              } else if (isComputerBlock) {
                boxShadow = "0 0 8px 2px white inset";
                backgroundColor = "#ffffff33";
              }
            }
          }

          // Always apply pink border on selection
          if (!result && isPlayerBlock) {
            boxShadow = "0 0 0 4px #EC407A inset";
            backgroundColor = "#394150";
          }

          return (
            <Grid
              key={location.index}
              onClick={() => setPlayerChoice(location.index)}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 140,
                minWidth: 140,
                fontFamily: "Special Gothic Expanded One",
                color: "#ffffff",
                backgroundColor,
                boxShadow,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontFamily: "Special Gothic Expanded One",
                }}
              >
                {`Location ${location.index}`}
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontFamily: "Special Gothic Expanded One",
                }}
              >
                {location.type}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  </div>
)}


        {payoffMatrixDisplay && (
          <div
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <PayoffMatrixDisplay
              PayOffMatrix={PayOffMatrix}
              hideouts={hideouts}
            />
          </div>
        )}
        {payoffMatrixDisplay && (
          <table
            style={{
              marginTop: "20px",
              borderCollapse: "collapse",
              width: "200px",
              color: "#ffffff",
              fontFamily: "Special Gothic Expanded One",
              backgroundColor: "#2A313A",
              borderRadius: "8px",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "2px solid #3A404C",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Player
                </th>
                <th
                  style={{
                    borderBottom: "2px solid #3A404C",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ color: "#FF5252" /* red for seeker */ }}>
                <td
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #3A404C",
                    textAlign: "center",
                  }}
                >
                  Seeker
                </td>
                <td
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #3A404C",
                    textAlign: "center",
                  }}
                >
                  {seekerScore}
                </td>
              </tr>
              <tr style={{ color: "#448AFF" /* blue for hider */ }}>
                <td style={{ padding: "8px", textAlign: "center" }}>Hider</td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  {hiderScore}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {result && (
          <div
            style={{
              backgroundColor: "#2A313A",
              padding: "16px",
              borderRadius: "12px",
              color: "#fff",
              fontFamily: "Special Gothic Expanded One",
              maxWidth: "350px",
              marginTop: "20px",
            }}
          >
            <h3 style={{ marginBottom: "12px", textAlign: "center" }}>
              Last Round Result
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Computer Role:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {result.computer_role}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Computer Choice:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {result.computer_choice}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Human Role:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {result.human_role}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Winner:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {result.winner}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Game Value:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {result.game_value}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Proximity:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {result.proximity}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Hider Payoff:
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      color: "#448AFF",
                    }}
                  >
                    {result.hider_payoff}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Seeker Payoff:
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      color: "#FF5252",
                    }}
                  >
                    {result.seeker_payoff}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Hider Optimal Strategy:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    [
                    {result.hider_optimal_strategy
                      .map((x) => x.toFixed(2))
                      .join(", ")}
                    ]
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Seeker Optimal Strategy:
                  </td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    [
                    {result.seeker_optimal_strategy
                      .map((x) => x.toFixed(2))
                      .join(", ")}
                    ]
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractiveForm;
