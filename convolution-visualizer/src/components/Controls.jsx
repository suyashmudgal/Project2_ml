import React from 'react';
import { datasets } from '../data/datasets';
import { filters } from '../data/filters';
import { Play, Pause, StepForward, RotateCcw, Maximize, Minimize } from 'lucide-react';

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
    <div className="controls-bar glass-panel" style={{ padding: '1rem 2rem', marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
      <div className="control-group">
        <label className="control-label" style={{ marginRight: '0.5rem' }}>Dataset</label>
        <select 
          value={selectedDatasetId} 
          onChange={(e) => setSelectedDatasetId(e.target.value)}
          style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--panel-bg)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', cursor: 'pointer', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
        >
          {datasets.map(ds => (
            <option key={ds.id} value={ds.id}>{ds.name}</option>
          ))}
        </select>
      </div>
      
      <div className="control-group">
        <label className="control-label" style={{ marginRight: '0.5rem' }}>Filter</label>
        <select 
          value={selectedFilterId} 
          onChange={(e) => setSelectedFilterId(e.target.value)}
          style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--panel-bg)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', cursor: 'pointer', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
        >
          {filters.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      <div className="control-group" style={{ gap: '1rem' }}>
        <button className="btn" onClick={reset} title="Reset" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
          <RotateCcw size={18} /> Reset
        </button>
        <button className="btn" onClick={stepForward} title="Step Forward" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
          <StepForward size={18} /> Step
        </button>
        <button 
          className={`btn ${isPlaying ? 'btn-primary' : ''}`} 
          onClick={togglePlay} 
          title={isPlaying ? 'Pause' : 'Play'}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold' }}
        >
          {isPlaying ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Play</>}
        </button>
      </div>

      <div className="control-group" style={{ marginLeft: 'auto' }}>
        <button className="btn" onClick={toggleFullScreen} title="Toggle Fullscreen" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
          {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
}
