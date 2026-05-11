import React from 'react';

export function OutputGrid({ data, currentStep, hoveredCell, setHoveredCell }) {
  if (!data || data.length === 0) return null;

  const rows = data.length;
  const cols = data[0].length;

  const isHovered = (r, c) => {
    if (!hoveredCell || hoveredCell.type !== 'output') return false;
    return r === hoveredCell.row && c === hoveredCell.col;
  };

  const getActivationColor = (val) => {
    if (val === null || val === undefined) return 'var(--grid-border)';
    
    // Scale visualization logic
    // Assuming typical output range between -5 and 5 roughly, can normalize
    // Use red/orange for positive, blue for negative
    if (val > 0) {
      // Normalize to 0-1 for a max expected value of 3 (for visualization)
      const intensity = Math.min(val / 3, 1);
      // Interpolate between orange and red based on intensity
      // Orange: 249, 115, 22
      // Red: 239, 68, 68
      const r = Math.floor(249 + intensity * (239 - 249));
      const g = Math.floor(115 + intensity * (68 - 115));
      const b = Math.floor(22 + intensity * (68 - 22));
      return `rgb(${r}, ${g}, ${b})`;
    } else if (val < 0) {
      // Blue: 59, 130, 246
      const intensity = Math.min(Math.abs(val) / 3, 1);
      return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`;
    }
    return 'var(--neutral-color)';
  };

  return (
    <div className="grid-container">
      <h3 className="grid-title">Feature Map ({rows}x{cols})</h3>
      <div className="pixel-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {data.map((row, r) =>
          row.map((val, c) => {
            // A cell is only "computed" if its index (r*cols + c) <= currentStep
            const cellIndex = r * cols + c;
            const isComputed = cellIndex <= currentStep;
            const activeHover = isHovered(r, c);
            const displayVal = isComputed ? val : null;

            return (
              <div 
                key={`${r}-${c}`}
                className={`pixel ${activeHover ? 'active-window' : ''}`}
                style={{ backgroundColor: getActivationColor(displayVal) }}
                title={isComputed ? `Row: ${r}, Col: ${c}\nValue: ${displayVal.toFixed(2)}` : 'Not computed yet'}
                onMouseEnter={() => isComputed && setHoveredCell({ type: 'output', row: r, col: c })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {isComputed ? displayVal.toFixed(1) : ''}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
