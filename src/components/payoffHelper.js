import React from 'react';
import Box from '@mui/joy/Box'; 
import Typography from '@mui/joy/Typography'; 
import { BlockMath } from 'react-katex'; 
import 'katex/dist/katex.min.css';

/**
 * Converts a payoff matrix to LaTeX format
 * @param {Array} matrix - 2D payoff matrix
 * @param {Array} hideouts - Array of hideout objects for labeling
 * @returns {string} - LaTeX representation of the matrix
 */
function matrixToLatex(PayOffMatrix, hideouts) {
  if (!PayOffMatrix || PayOffMatrix.length === 0) return '';
  
  let latexString = `\\begin{pmatrix}\n`;
  
  for (let i = 0; i < PayOffMatrix.length; i++) {
    latexString += PayOffMatrix[i].join(' & ') + ' \\\\';
    if (i < PayOffMatrix.length - 1) {
      latexString += '\n';
    }
  }
  
  latexString += '\\end{pmatrix}';
  
  return latexString;
}

/**
 * Display a LaTeX-formatted payoff matrix passed in as a prop.
 */
export default function PayOffMatrixDisplay({ PayOffMatrix, hideouts = [] }) {
  // Log matrix to console
  console.log("Received Payoff Matrix:", PayOffMatrix);

  // Generate LaTeX string
  const latex = matrixToLatex(PayOffMatrix, hideouts);

  return (
    <Box sx={{ mt: 4, color: 'white' }}>
      <Typography level="h4" sx={{ mb: 1 }}>
        Payoff Matrix
      </Typography>

      {(!PayOffMatrix || PayOffMatrix.length === 0) ? (
        <Typography color="warning">No payoff matrix available to display</Typography>
      ) : (
        <BlockMath math={latex} />
      )}

      {/* Optional debug text */}
      <Box sx={{ mt: 2, display: 'none' }}>
        <Typography level="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
          {PayOffMatrix.map(row => row.join(' | ')).join('\n')}
        </Typography>
      </Box>
    </Box>
  );
}
