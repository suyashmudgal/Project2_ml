import React, { useState } from 'react';

export function InputGrid({ data, currentStep, hoveredCell, setHoveredCell, stride, outCols, paddingAmount, onPixelClick, isCustomMode }) {
  const [isDrawing, setIsDrawing] = useState(false);

  if (!data || data.length === 0) return null;
  const rows = data.length;
  const cols = data[0].length;
  
  const windowRow = Math.floor(currentStep / outCols) * stride;
  const windowCol = (currentStep % outCols) * stride;
  
  const isInWindow = (r, c) => {
    return r >= windowRow && r < windowRow + 3 && c >= windowCol && c < windowCol + 3;
  };

  const isHovered = (r, c) => {
    if (!hoveredCell || hoveredCell.type !== 'input') return false;
    return r === windowRow + hoveredCell.row && c === windowCol + hoveredCell.col;
  };

  const isPadding = (r, c) => {
    if (paddingAmount === 0) return false;
    return r < paddingAmount || r >= rows - paddingAmount || c < paddingAmount || c >= cols - paddingAmount;
  };

  const getIntensityColor = (val, isPad) => {
    if (isPad) return 'rgba(0,0,0,0.5)';
    const intensity = Math.floor(val * 255);
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  };

  const handleMouseDown = (r, c) => {
    if (isCustomMode) {
      setIsDrawing(true);
      onPixelClick(r, c);
    }
  };

  const handleMouseEnter = (r, c) => {
    if (isDrawing && isCustomMode) {
      onPixelClick(r, c);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="grid-container" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <h3 className="grid-title">Input Image ({rows}x{cols})</h3>
      {isCustomMode && <div style={{color: 'var(--accent-color)', fontSize: '0.8rem', marginTop: '-1rem'}}>Click and drag to draw!</div>}
      <div className="pixel-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, cursor: isCustomMode ? 'crosshair' : 'default' }}>
        {data.map((row, r) =>
          row.map((val, c) => {
            const inWindow = isInWindow(r, c);
            const activeHover = isHovered(r, c);
            const isPad = isPadding(r, c);
            
            return (
              <div 
                key={`${r}-${c}`}
                className={`pixel ${inWindow ? 'in-window' : ''} ${activeHover ? 'active-window' : ''}`}
                style={{ 
                  backgroundColor: getIntensityColor(val, isPad),
                  border: isPad ? '1px dashed rgba(255,255,255,0.2)' : undefined 
                }}
                title={`Row: ${r}, Col: ${c}\nValue: ${val.toFixed(2)}${isPad ? ' (Padding)' : ''}`}
                onMouseDown={() => handleMouseDown(r, c)}
                onMouseEnter={() => handleMouseEnter(r, c)}
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
