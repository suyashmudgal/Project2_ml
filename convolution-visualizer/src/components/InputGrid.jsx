import React from 'react';

export default function InputGrid({ data, windowRow, windowCol, filterSize, hoveredOutputCell, stride, paddingVal }) {
  if (!data || data.length === 0) return null;
  const rows = data.length;
  const cols = data[0].length;

  const isInWindow = (r, c) => (
    r >= windowRow && r < windowRow + filterSize &&
    c >= windowCol && c < windowCol + filterSize
  );

  const isHoverHighlight = (r, c) => {
    if (!hoveredOutputCell) return false;
    const { outR, outC } = hoveredOutputCell;
    const startR = outR * stride;
    const startC = outC * stride;
    return r >= startR && r < startR + filterSize && c >= startC && c < startC + filterSize;
  };

  const isPadding = (r, c) => {
    if (paddingVal === 0) return false;
    return r < paddingVal || r >= rows - paddingVal || c < paddingVal || c >= cols - paddingVal;
  };

  const getColor = (val, isPad) => {
    if (isPad) return 'rgba(30, 41, 59, 0.5)';
    const v = Math.round(val * 255);
    return `rgb(${v},${v},${v})`;
  };

  return (
    <div className="grid-panel">
      <div className="grid-panel-title">Input Image ({rows}×{cols})</div>
      {paddingVal > 0 && <div className="grid-panel-subtitle">Zero-padded (p={paddingVal})</div>}
      <div className="pixel-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {data.map((row, r) =>
          row.map((val, c) => {
            const isPad = isPadding(r, c);
            const inWin = isInWindow(r, c);
            const hoverHl = isHoverHighlight(r, c);
            const classes = ['px'];
            if (isPad) classes.push('is-padding');
            if (inWin) classes.push('in-window');
            if (hoverHl) classes.push('hover-highlight');

            return (
              <div
                key={`${r}-${c}`}
                className={classes.join(' ')}
                style={{ backgroundColor: getColor(val, isPad) }}
                title={`[${r}, ${c}] = ${val.toFixed(2)}${isPad ? ' (pad)' : ''}`}
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
