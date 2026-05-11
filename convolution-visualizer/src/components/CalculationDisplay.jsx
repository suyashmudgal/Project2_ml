import React from 'react';

export function CalculationDisplay({ inputWindow, filter, outputValue, hoveredCell, setHoveredCell }) {
  if (!inputWindow || !filter) return null;

  return (
    <div className="calc-section glass-panel" style={{ 
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
      position: 'sticky', 
      top: '2rem',
      border: '1px solid rgba(255,255,255,0.1)' 
    }}>
      <h3 className="grid-title" style={{ marginBottom: '1.5rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', display: 'inline-block' }}></span>
        Calculation
      </h3>
      <div className="formula-display" style={{ 
        background: 'rgba(0,0,0,0.2)', 
        padding: '1.5rem', 
        borderRadius: '1rem',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Input Window */}
        <div className="matrix-wrapper" style={{ position: 'relative', padding: '0 0.5rem' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '10px', borderTop: '2px solid var(--text-muted)', borderBottom: '2px solid var(--text-muted)', borderLeft: '2px solid var(--text-muted)' }}></div>
          <div className="matrix">
            {inputWindow.map((row, r) =>
              row.map((val, c) => (
                <div 
                  key={`in-${r}-${c}`}
                  className={`matrix-cell ${hoveredCell?.type === 'input' && hoveredCell.row === r && hoveredCell.col === c ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredCell({ type: 'input', row: r, col: c })}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{ borderRadius: '0.25rem', fontSize: '0.8rem', color: val > 0 ? 'var(--text-main)' : 'var(--text-muted)' }}
                >
                  {val.toFixed(1)}
                </div>
              ))
            )}
          </div>
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '10px', borderTop: '2px solid var(--text-muted)', borderBottom: '2px solid var(--text-muted)', borderRight: '2px solid var(--text-muted)' }}></div>
        </div>

        <div className="math-operator" style={{ margin: '0 0.5rem' }}>×</div>

        {/* Filter */}
        <div className="matrix-wrapper" style={{ position: 'relative', padding: '0 0.5rem' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '10px', borderTop: '2px solid var(--text-muted)', borderBottom: '2px solid var(--text-muted)', borderLeft: '2px solid var(--text-muted)' }}></div>
          <div className="matrix">
            {filter.map((row, r) =>
              row.map((val, c) => (
                <div 
                  key={`fil-${r}-${c}`}
                  className={`matrix-cell ${hoveredCell?.type === 'input' && hoveredCell.row === r && hoveredCell.col === c ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredCell({ type: 'input', row: r, col: c })}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{ borderRadius: '0.25rem', fontSize: '0.8rem', color: val !== 0 ? 'var(--accent-color)' : 'var(--text-muted)', fontWeight: val !== 0 ? 'bold' : 'normal' }}
                >
                  {val}
                </div>
              ))
            )}
          </div>
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '10px', borderTop: '2px solid var(--text-muted)', borderBottom: '2px solid var(--text-muted)', borderRight: '2px solid var(--text-muted)' }}></div>
        </div>

        <div className="math-operator" style={{ margin: '0 0.5rem' }}>=</div>

        {/* Output Value */}
        <div 
          className={`calc-result ${hoveredCell?.type === 'output' ? 'highlight' : ''}`}
          onMouseEnter={() => setHoveredCell({ type: 'output', row: 0, col: 0 })}
          onMouseLeave={() => setHoveredCell(null)}
          style={{ 
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)', 
            background: 'var(--bg-color)',
            minWidth: '4rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {outputValue !== undefined && outputValue !== null ? outputValue.toFixed(2) : '?'}
        </div>
      </div>
      <div style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', lineHeight: '1.5' }}>
        <strong>Frobenius Inner Product</strong> <br/>
        Element-wise multiplication and summation.
      </div>
    </div>
  );
}
