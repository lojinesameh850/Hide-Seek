import React, { useState } from "react";
import { Textarea, Button, Select, Option } from "@mui/joy";
import generateHideoutGrid from "./gridHelper";
import generatePayoffMatrix from "./payoffHelper";
import PayoffMatrixDisplay from "./payoffHelper";

function InteractiveForm() {
  const [numHideouts, setNumHideouts] = useState(2);
  const [userRole, setUserRole] = useState('');
  const [worldType, setWorldType] = useState('');

  const [hideouts, setHideouts] = useState([]);

  const [generateGrid, setGenerateGrid] = useState(false); // controls when to show grid
  const [payoffMatrixDisplay, setPayoffMatrixDisplay] = useState(false); // controls when to show payoff matrix

  // const hideouts = generateHideoutGrid({ numHideouts });
  // const payoffMatrix = generatePayoffMatrix(hideouts);

  const handleGenerateGrid = () => {
    const hideouts = generateHideoutGrid({ numHideouts });
    setHideouts(hideouts);
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
            onClick={() => {
              setGenerateGrid(true);
              setPayoffMatrixDisplay(true);
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
            <PayoffMatrixDisplay hideouts={hideouts} />
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractiveForm;