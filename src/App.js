import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./components/InitialPage";
import { CssVarsProvider } from '@mui/joy/styles'; // Add this import
import './index.css';

const HideSeekGame = () => {
  return (
    <CssVarsProvider> {/* Wrap with CssVarsProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
        </Routes>
      </Router>
    </CssVarsProvider>
  );
}

export default HideSeekGame;