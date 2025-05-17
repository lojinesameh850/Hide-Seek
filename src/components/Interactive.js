import React, { useEffect, useState } from "react";
import { Textarea, Button, Select, Option } from "@mui/joy";
import generateHideoutGrid from "./gridHelper";
import PayoffMatrixDisplay from "./payoffHelper";

function InteractiveForm() {
  const [numHideouts, setNumHideouts] = useState(2);
  const [userRole, setUserRole] = useState('');
  const [worldType, setWorldType] = useState('');

  const [hideouts, setHideouts] = useState([]);

  const [generateGrid, setGenerateGrid] = useState(false); // controls when to show grid
  const [payoffMatrixDisplay, setPayoffMatrixDisplay] = useState(false); // controls when to show payoff matrix
  const [PayOffMatrix, setpayoffMatrix] = useState([])
  // const hideouts = generateHideoutGrid({ numHideouts });
  // const payoffMatrix = generatePayoffMatrix(hideouts);
  useEffect(() => {
    console.log(PayOffMatrix)
  }, [PayOffMatrix])
  useEffect(() => {
    setGenerateGrid(true);
    setPayoffMatrixDisplay(true);
    generatePayoffMatrix(hideouts);    
  }, [hideouts])
  
  function generatePayoffMatrix(hideouts) {
    console.log(hideouts)
    // Ensure hideouts is a valid array
    if (!Array.isArray(hideouts) || hideouts.length === 0) {
      console.log("failed")
      return [];
    }
    
    // Set both row and column size based on number hideouts
    const size = hideouts.length;
    // Initialize matrix with zeros
    const payoffMatrix = Array(size).fill().map(() => Array(size).fill(0));
    
    // Fill matrix based on hideout types
    for (let i = 0; i < size; i++) {
      const hideoutType = hideouts[i].type;
      
      for (let j = 0; j < size; j++) {
        if (i === j) {
          // Diagonal entries are always negative (means the seeker found the hider and won)
          switch (hideoutType) {
            case 'Easy':
              payoffMatrix[i][j] = -1;
              break;
            case 'Neutral':
              payoffMatrix[i][j] = -2;
              break;
            case 'Hard':
              payoffMatrix[i][j] = -3;
              break;
            default:
              payoffMatrix[i][j] = -1; // Default case
          }
        } else {
          // Non-diagonal entries (means the hider wasn't found and won, no deduction from hider)
          switch (hideoutType) {
            case 'Easy':
              payoffMatrix[i][j] = 3;
              break;
            case 'Neutral':
              payoffMatrix[i][j] = 2;
              break;
            case 'Hard':
              payoffMatrix[i][j] = 1;
              break;
            default:
              payoffMatrix[i][j] = 1; // Default case
          }
        }
      }
    
    }
    console.log("heere " + payoffMatrix)
    setpayoffMatrix(payoffMatrix)
  }
  function generateHideouts(count) {
    const types = ['Easy', 'Neutral', 'Hard'];
    const newHides = [];
    
    for (let i = 1; i <= count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      newHides.push({ index: i, type });
    }
    
    setHideouts(newHides)
  }
  const handleGenerateGrid = () => {
    generateHideouts(numHideouts)
    console.log(numHideouts)
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
        fontFamily: 'Special Gothic Expanded One',
      }}
    >
      {/* Create and visualize world */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: 'Special Gothic Expanded One',
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: 'Special Gothic Expanded One',
          }}
        >
          <p style={{ justifyContent: "center", display: "inline", margin: 0, fontSize: '25px' }}>Choose your role</p>
          <Select
            defaultValue="hider"
            placeholder="Hider"
            value={userRole}
            onChange={(event, userRole) => setUserRole(userRole)}
            style={{
              height: "35px",
              width: "135px",
              fontSize: "20px",
              fontFamily: 'Special Gothic Expanded One',
            }}
          >
            <Option sx={{ fontFamily: 'Special Gothic Expanded One' }} value="hider">Hider</Option>
            <Option sx={{ fontFamily: 'Special Gothic Expanded One' }} value="seeker">Seeker</Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: 'Special Gothic Expanded One',
          }}
        >
          <p style={{ justifyContent: "center", display: "inline", margin: 0, fontSize: '25px' }}>Choose world type</p>
          <Select
            defaultValue="linear"
            placeholder="Linear (1D)"
            value={worldType}
            onChange={(event, worldType) => setWorldType(worldType)}
            style={{
              height: "35px",
              width: "170px",
              fontSize: "20px",
              fontFamily: 'Special Gothic Expanded One',
            }}
          >
            <Option sx={{ fontFamily: 'Special Gothic Expanded One' }} value="linear">Linear (1D)</Option>
            <Option sx={{ fontFamily: 'Special Gothic Expanded One' }} value="grid">Grid (2D)</Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: 'Special Gothic Expanded One',
          }}
        >
          <p style={{ justifyContent: "center", display: "inline", margin: 0, fontSize: '25px' }}>Enter size of world</p>
          <Textarea
            type="number"
            variant="soft"
            sx={{
              justifyContent: "center",
              fontFamily: 'Special Gothic Expanded One',
              width: "90px",
              height: "30px",
              fontSize: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              padding: "2px 8px"
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
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              fontFamily: 'Special Gothic Expanded One',
              backgroundColor: "#EC407A",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#D12366" },
              "&:active": { backgroundColor: "#B01F5D" },
            }}
            variant="solid"
            onClick={async () => {
              await handleGenerateGrid()
            }}
          >
            Create World
          </Button>
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
          <div style={{ marginTop: "15px", marginBottom: "15px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {generateHideoutGrid({ count: numHideouts, hideouts })}
          </div>
        )}

        {payoffMatrixDisplay && (
          <div style={{ marginTop: "15px", marginBottom: "15px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <PayoffMatrixDisplay PayOffMatrix={PayOffMatrix} hideouts={hideouts}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractiveForm;