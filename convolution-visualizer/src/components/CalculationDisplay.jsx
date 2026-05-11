import React from 'react';

export default function CalculationDisplay({ inputWindow, filter, outputValue, operationMode, applyRelu, hoveredCell, setHoveredCell }) {
  if (!inputWindow || !filter) return null;

  const filterSize = filter.length;
  const displayValue = applyRelu ? Math.max(0, outputValue ?? 0) : outputValue;
  const resultClass = displayValue > 0 ? 'positive' : displayValue < 0 ? 'negative' : '';

  const opLabel = operationMode === 'maxpool' ? 'Max Pooling' :
                  operationMode === 'transposed' ? 'Transposed Conv' : 'Convolution';

  return (
    <div className="calc-panel">
      <div className="calc-title">
        <span className="dot" />
        {opLabel}
      </div>

      <div className="calc-formula">
        {/* Input window matrix */}
        <div className="calc-matrix" style={{ gridTemplateColumns: `repeat(${filterSize}, 1fr)` }}>
          {inputWindow.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`in-${r}-${c}`}
                className={`calc-cell ${hoveredCell?.r === r && hoveredCell?.c === c ? 'hl' : ''}`}
                onMouseEnter={() => setHoveredCell({ r, c })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {val.toFixed(1)}
              </div>
            ))
          )}
        </div>

        {operationMode === 'maxpool' ? (
          <div className="calc-op">max</div>
        ) : (
          <>
            <div className="calc-op">⊙</div>
            {/* Filter matrix */}
            <div className="calc-matrix" style={{ gridTemplateColumns: `repeat(${filterSize}, 1fr)` }}>
              {filter.map((row, r) =>
                row.map((val, c) => {
                  const isZero = val === 0;
                  return (
                    <div
                      key={`f-${r}-${c}`}
                      className={`calc-cell filter-val ${isZero ? 'zero' : ''} ${hoveredCell?.r === r && hoveredCell?.c === c ? 'hl' : ''}`}
                      onMouseEnter={() => setHoveredCell({ r, c })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {Number.isInteger(val) ? val : val.toFixed(2)}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        <div className="calc-op">=</div>

        <div className={`calc-result-box ${resultClass}`}>
          {displayValue !== null && displayValue !== undefined ? displayValue.toFixed(2) : '—'}
        </div>
      </div>

      <div className="calc-label">
        {operationMode === 'maxpool'
          ? 'Maximum value in window'
          : applyRelu
            ? 'Σ(element-wise product) → ReLU'
            : 'Σ(element-wise product)'}
      </div>
    </div>
  );
}
