import React from 'react';

export default function OutputGrid({ data, currentStep, applyRelu, setHoveredOutputCell }) {
  if (!data || data.length === 0) return null;

  const rows = data.length;
  const cols = data[0].length;

  // Find global min/max for normalization
  let gMax = 0.001;
  for (const row of data) for (const v of row) {
    const abs = Math.abs(v);
    if (abs > gMax) gMax = abs;
  }

  const getColor = (rawVal, isComputed) => {
    if (!isComputed) return 'var(--bg-primary)';

    let val = rawVal;
    if (applyRelu) val = Math.max(0, val);

    if (val === 0) return 'var(--relu-zero)';

    const norm = Math.min(Math.abs(val) / gMax, 1);

    if (val > 0) {
      // Interpolate orange → red
      const r = Math.round(249 + norm * (239 - 249));
      const g = Math.round(115 - norm * 80);
      const b = Math.round(22);
      return `rgba(${r},${g},${b},${0.3 + norm * 0.7})`;
    } else {
      // Blue for negative
      return `rgba(59, 130, 246, ${0.2 + norm * 0.8})`;
    }
  };

  return (
    <div className="grid-panel">
      <div className="grid-panel-title">Feature Map ({rows}×{cols})</div>
      {applyRelu && <div className="grid-panel-subtitle">ReLU Applied</div>}
      <div className="pixel-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {data.map((row, r) =>
          row.map((rawVal, c) => {
            const idx = r * cols + c;
            const isComputed = idx <= currentStep;
            let displayVal = isComputed ? rawVal : null;
            if (isComputed && applyRelu) displayVal = Math.max(0, rawVal);

            return (
              <div
                key={`${r}-${c}`}
                className="px px-out"
                style={{ backgroundColor: getColor(rawVal, isComputed) }}
                title={isComputed ? `[${r},${c}] = ${displayVal.toFixed(2)}` : 'Not computed'}
                onMouseEnter={() => isComputed && setHoveredOutputCell({ outR: r, outC: c })}
                onMouseLeave={() => setHoveredOutputCell(null)}
              >
                {isComputed ? displayVal.toFixed(1) : ''}
              </div>
            );
          })
        )}
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${Math.min(100, ((currentStep + 1) / (rows * cols)) * 100)}%` }} />
      </div>
    </div>
  );
}
