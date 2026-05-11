import React from 'react';
import { datasets } from '../data/datasets';
import { filters } from '../data/filters';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function Controls({
  selectedDatasetId, setSelectedDatasetId,
  selectedFilterId, setSelectedFilterId,
  customFilter, setCustomFilter,
  stride, setStride,
  paddingVal, setPaddingVal,
  operationMode, setOperationMode,
  applyRelu, setApplyRelu,
  isPlaying, togglePlay, stepForward, reset
}) {
  const isCustomFilter = selectedFilterId === 'custom';

  const handleCustomFilterChange = (r, c, value) => {
    const num = parseFloat(value);
    const newFilter = customFilter.map(row => [...row]);
    newFilter[r][c] = isNaN(num) ? 0 : num;
    setCustomFilter(newFilter);
  };

  return (
    <div className="controls-panel">
      {/* Dataset */}
      <div className="ctrl-group">
        <label>Dataset / Image</label>
        <select value={selectedDatasetId} onChange={e => setSelectedDatasetId(e.target.value)}>
          <optgroup label="MNIST Digits">
            {datasets.filter(d => d.category === 'MNIST').map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </optgroup>
          <optgroup label="Fashion MNIST">
            {datasets.filter(d => d.category === 'Fashion MNIST').map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Filter */}
      <div className="ctrl-group">
        <label>Filter / Kernel</label>
        <select value={selectedFilterId} onChange={e => setSelectedFilterId(e.target.value)}>
          <optgroup label="Edge Detection">
            {filters.filter(f => f.category === 'Edge').map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </optgroup>
          <optgroup label="Prewitt">
            {filters.filter(f => f.category === 'Prewitt').map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </optgroup>
          <optgroup label="Sobel">
            {filters.filter(f => f.category === 'Sobel').map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </optgroup>
          <optgroup label="Other">
            {filters.filter(f => ['Laplacian','Other'].includes(f.category)).map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </optgroup>
          <optgroup label="Interactive">
            <option value="custom">✏️ Custom Filter</option>
          </optgroup>
        </select>
      </div>

      {/* Custom Filter Editor */}
      {isCustomFilter && (
        <div className="ctrl-group">
          <label>Custom Weights</label>
          <div className="custom-filter-editor">
            {customFilter.map((row, r) =>
              row.map((val, c) => (
                <input
                  key={`${r}-${c}`}
                  type="number"
                  step="0.1"
                  value={val}
                  onChange={e => handleCustomFilterChange(r, c, e.target.value)}
                />
              ))
            )}
          </div>
        </div>
      )}

      <div className="ctrl-sep" />

      {/* Operation Mode */}
      <div className="ctrl-group">
        <label>Operation</label>
        <select value={operationMode} onChange={e => setOperationMode(e.target.value)}>
          <option value="convolution">Convolution</option>
          <option value="maxpool">Max Pooling</option>
          <option value="transposed">Transposed Conv</option>
        </select>
      </div>

      {/* Stride */}
      <div className="ctrl-group">
        <label>Stride</label>
        <input type="number" min="1" max="4" value={stride}
          onChange={e => setStride(Math.max(1, parseInt(e.target.value) || 1))} />
      </div>

      {/* Padding */}
      <div className="ctrl-group">
        <label>Padding</label>
        <input type="number" min="0" max="4" value={paddingVal}
          onChange={e => setPaddingVal(Math.max(0, parseInt(e.target.value) || 0))} />
      </div>

      {/* ReLU */}
      <div className="ctrl-group">
        <label>&nbsp;</label>
        <label className="ctrl-toggle">
          <input type="checkbox" checked={applyRelu} onChange={e => setApplyRelu(e.target.checked)} />
          <span>Apply ReLU</span>
        </label>
      </div>

      <div className="ctrl-sep" />

      {/* Playback */}
      <div className="ctrl-buttons">
        <button className="btn" onClick={reset}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Reset
        </button>
        <button className="btn" onClick={stepForward}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Step
        </button>
        <button className={`btn ${isPlaying ? 'btn-accent' : ''}`} onClick={togglePlay}>
          {isPlaying ? (
            <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Pause</>
          ) : (
            <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>Play</>
          )}
        </button>
      </div>
    </div>
  );
}
