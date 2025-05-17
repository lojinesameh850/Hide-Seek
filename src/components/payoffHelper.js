import React from 'react';
import Box from '@mui/joy/Box'; 
import Typography from '@mui/joy/Typography'; 
import { BlockMath } from 'react-katex'; 
import 'katex/dist/katex.min.css';

/**
 * Generates a payoff matrix based on hideout types
 * @param {Array} hideouts - Array of hideout objects with index and type
 * @returns {Array} - 2D payoff matrix
 */
function generatePayoffMatrix(hideouts) {
  // Ensure hideouts is a valid array
  if (!Array.isArray(hideouts) || hideouts.length === 0) {
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
  
  return payoffMatrix;
}

/**
 * Converts a payoff matrix to LaTeX format
 * @param {Array} matrix - 2D payoff matrix
 * @param {Array} hideouts - Array of hideout objects for labeling
 * @returns {string} - LaTeX representation of the matrix
 */
function matrixToLatex(payoffMatrix, hideouts) {
  if (!payoffMatrix || payoffMatrix.length === 0) return '';
  
  // Use template literals and double backslashes for LaTeX
  let latexString = `\\begin{pmatrix}\n`;
  
  for (let i = 0; i < payoffMatrix.length; i++) {
    latexString += payoffMatrix[i].join(' & ') + ' \\\\';
    // Don't add newline after the last row
    if (i < payoffMatrix.length - 1) {
      latexString += '\n';
    }
  }
  
  latexString += '\\end{pmatrix}';
  
  // Add hideout types as a comment below the matrix
  if (Array.isArray(hideouts) && hideouts.length > 0) {
    latexString += ' \\quad \\text{Hideouts: } ';
    latexString += hideouts.map((h, idx) => `${idx}: \\text{${h.type}}`).join(', ');
  }
  
  return latexString;
}

export default function PayoffMatrixDisplay({ hideouts }) {  
  const matrix = generatePayoffMatrix(hideouts);
  
  // Log matrix in console to inspect
  console.log("Generated Payoff Matrix:", matrix);
  
  // Generate the LaTeX string
  const latex = matrixToLatex(matrix, hideouts);
  
  // Debug: Log the LaTeX string to make sure it's valid
  console.log("LaTeX string:", latex);
  
  return (
    <Box sx={{ mt: 4, color: 'white' }}>
      <Typography level="h4" sx={{ mb: 1 }}>
        Payoff Matrix
      </Typography>
      
      {/* Fallback in case the matrix is empty */}
      {matrix.length === 0 ? (
        <Typography color="warning">No hideouts available to generate matrix</Typography>
      ) : (
        <BlockMath math={latex} />
      )}
      
      {/* Debug: Show text representation of matrix */}
      <Box sx={{ mt: 2, display: 'none' }}>
        <Typography level="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
          {matrix.map(row => row.join(' | ')).join('\n')}
        </Typography>
      </Box>
    </Box>
  );
}