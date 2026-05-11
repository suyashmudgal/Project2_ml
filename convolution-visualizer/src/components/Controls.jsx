import React from 'react';
import { datasets } from '../data/datasets';
import { filters } from '../data/filters';

export function Controls({
  selectedDatasetId,
  setSelectedDatasetId,
  selectedFilterId,
  setSelectedFilterId,
  isPlaying,
  togglePlay,
  stepForward,
  reset,
  isFullScreen,
  toggleFullScreen
}) {
  return (
    <div className="controls-bar">
      <div className="control-group">
        <label className="control-label">Dataset</label>
        <select 
          value={selectedDatasetId} 
          onChange={(e) => setSelectedDatasetId(e.target.value)}
        >
          {datasets.map(ds => (
            <option key={ds.id} value={ds.id}>{ds.name}</option>
          ))}
        </select>
      </div>
      
      <div className="control-group">
        <label className="control-label">Filter</label>
        <select 
          value={selectedFilterId} 
          onChange={(e) => setSelectedFilterId(e.target.value)}
        >
          {filters.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <button className="btn" onClick={reset}>
          Reset
        </button>
        <button className="btn" onClick={stepForward}>
          Step
        </button>
        <button className={`btn ${isPlaying ? 'btn-primary' : ''}`} onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="control-group" style={{ marginLeft: 'auto' }}>
        <button className="btn" onClick={toggleFullScreen}>
          {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
}
