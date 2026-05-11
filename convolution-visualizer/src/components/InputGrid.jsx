import React from 'react';

export function InputGrid({ data, currentStep, hoveredCell, setHoveredCell }) {
  const rows = data.length;
  const cols = data[0].length;
  
  // The output grid will be (rows-2) x (cols-2)
  const outCols = cols - 2;
  
  const windowRow = Math.floor(currentStep / outCols);
  const windowCol = currentStep % outCols;
  
  const isInWindow = (r, c) => {
    return r >= windowRow && r < windowRow + 3 && c >= windowCol && c < windowCol + 3;
  };

  const isHovered = (r, c) => {
    if (!hoveredCell || hoveredCell.type !== 'input') return false;
    // Check if the cell is corresponding to the hovered window cell
    return r === windowRow + hoveredCell.row && c === windowCol + hoveredCell.col;
  };

  const getIntensityColor = (val) => {
    // val is 0.0 to 1.0
    const intensity = Math.floor(val * 255);
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  };

  return (
    <div className="grid-container">
      <h3 className="grid-title">Input Image (28x28)</h3>
      <div className="pixel-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {data.map((row, r) =>
          row.map((val, c) => {
            const inWindow = isInWindow(r, c);
            const activeHover = isHovered(r, c);
            
            return (
              <div 
                key={`${r}-${c}`}
                className={`pixel ${inWindow ? 'in-window' : ''} ${activeHover ? 'active-window' : ''}`}
                style={{ backgroundColor: getIntensityColor(val) }}
                title={`Row: ${r}, Col: ${c}\nValue: ${val.toFixed(2)}`}
              >
                {val.toFixed(1)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
