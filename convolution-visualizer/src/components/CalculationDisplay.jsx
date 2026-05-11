import React from 'react';

export function CalculationDisplay({ inputWindow, filter, outputValue, hoveredCell, setHoveredCell }) {
  if (!inputWindow || !filter) return null;

  return (
    <div className="calc-section glass-panel">
      <h3 className="grid-title">Calculation (Frobenius Inner Product)</h3>
      <div className="formula-display">
        {/* Input Window */}
        <div className="matrix">
          {inputWindow.map((row, r) =>
            row.map((val, c) => (
              <div 
                key={`in-${r}-${c}`}
                className={`matrix-cell ${hoveredCell?.type === 'input' && hoveredCell.row === r && hoveredCell.col === c ? 'highlight' : ''}`}
                onMouseEnter={() => setHoveredCell({ type: 'input', row: r, col: c })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {val.toFixed(1)}
              </div>
            ))
          )}
        </div>

        <div className="math-operator">*</div>

        {/* Filter */}
        <div className="matrix">
          {filter.map((row, r) =>
            row.map((val, c) => (
              <div 
                key={`fil-${r}-${c}`}
                className={`matrix-cell ${hoveredCell?.type === 'input' && hoveredCell.row === r && hoveredCell.col === c ? 'highlight' : ''}`}
                onMouseEnter={() => setHoveredCell({ type: 'input', row: r, col: c })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {val}
              </div>
            ))
          )}
        </div>

        <div className="math-operator">=</div>

        {/* Output Value */}
        <div 
          className={`calc-result ${hoveredCell?.type === 'output' ? 'highlight' : ''}`}
          onMouseEnter={() => setHoveredCell({ type: 'output', row: 0, col: 0 })} // The specific row/col doesn't matter here since we just want to highlight the result
          onMouseLeave={() => setHoveredCell(null)}
        >
          {outputValue !== undefined && outputValue !== null ? outputValue.toFixed(2) : '?'}
        </div>
      </div>
      <div style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Element-wise multiplication and sum.
      </div>
    </div>
  );
}
