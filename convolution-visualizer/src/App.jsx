import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Controls from './components/Controls';
import InputGrid from './components/InputGrid';
import OutputGrid from './components/OutputGrid';
import CalculationDisplay from './components/CalculationDisplay';
import { datasets } from './data/datasets';
import { filters } from './data/filters';
import './index.css';

const ArrowSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

function App() {
  // --- State ---
  const [selectedDatasetId, setSelectedDatasetId] = useState(datasets[0].id);
  const [selectedFilterId, setSelectedFilterId] = useState(filters[0].id);
  const [customFilter, setCustomFilter] = useState([[0,0,0],[0,1,0],[0,0,0]]);
  const [stride, setStride] = useState(1);
  const [paddingVal, setPaddingVal] = useState(0);
  const [operationMode, setOperationMode] = useState('convolution');
  const [applyRelu, setApplyRelu] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [hoveredCell, setHoveredCell] = useState(null);         // for calc matrix
  const [hoveredOutputCell, setHoveredOutputCell] = useState(null); // for output→input highlight

  // --- Derived data ---
  const baseData = useMemo(() => (
    datasets.find(d => d.id === selectedDatasetId)?.data || datasets[0].data
  ), [selectedDatasetId]);

  const activeFilter = useMemo(() => {
    if (selectedFilterId === 'custom') return customFilter;
    return filters.find(f => f.id === selectedFilterId)?.data || filters[0].data;
  }, [selectedFilterId, customFilter]);

  const filterSize = 3;

  // Build padded input
  const paddedData = useMemo(() => {
    if (paddingVal === 0) return baseData;
    const bR = baseData.length, bC = baseData[0].length;
    const padded = [];
    for (let r = -paddingVal; r < bR + paddingVal; r++) {
      const row = [];
      for (let c = -paddingVal; c < bC + paddingVal; c++) {
        row.push(r >= 0 && r < bR && c >= 0 && c < bC ? baseData[r][c] : 0);
      }
      padded.push(row);
    }
    return padded;
  }, [baseData, paddingVal]);

  const inRows = paddedData.length;
  const inCols = paddedData[0].length;

  // Compute output dimensions
  const outDims = useMemo(() => {
    if (operationMode === 'transposed') {
      const outR = (inRows - 1) * stride + filterSize;
      const outC = (inCols - 1) * stride + filterSize;
      return { rows: outR, cols: outC };
    }
    const outR = Math.floor((inRows - filterSize) / stride) + 1;
    const outC = Math.floor((inCols - filterSize) / stride) + 1;
    return { rows: Math.max(1, outR), cols: Math.max(1, outC) };
  }, [inRows, inCols, filterSize, stride, operationMode]);

  const maxSteps = outDims.rows * outDims.cols;

  // Compute full output grid
  const outputGrid = useMemo(() => {
    if (operationMode === 'transposed') {
      // Transposed convolution: scatter input values through filter
      const outR = outDims.rows, outC = outDims.cols;
      const grid = Array.from({ length: outR }, () => Array(outC).fill(0));
      for (let r = 0; r < inRows; r++) {
        for (let c = 0; c < inCols; c++) {
          for (let fr = 0; fr < filterSize; fr++) {
            for (let fc = 0; fc < filterSize; fc++) {
              const outRow = r * stride + fr;
              const outCol = c * stride + fc;
              if (outRow < outR && outCol < outC) {
                grid[outRow][outCol] += paddedData[r][c] * activeFilter[fr][fc];
              }
            }
          }
        }
      }
      return grid;
    }

    const grid = [];
    for (let r = 0; r < outDims.rows; r++) {
      const row = [];
      for (let c = 0; c < outDims.cols; c++) {
        const sR = r * stride, sC = c * stride;
        if (operationMode === 'maxpool') {
          let maxVal = -Infinity;
          for (let i = 0; i < filterSize; i++)
            for (let j = 0; j < filterSize; j++)
              maxVal = Math.max(maxVal, paddedData[sR + i]?.[sC + j] ?? 0);
          row.push(maxVal);
        } else {
          let sum = 0;
          for (let i = 0; i < filterSize; i++)
            for (let j = 0; j < filterSize; j++)
              sum += (paddedData[sR + i]?.[sC + j] ?? 0) * activeFilter[i][j];
          row.push(sum);
        }
      }
      grid.push(row);
    }
    return grid;
  }, [paddedData, activeFilter, outDims, stride, operationMode, filterSize, inRows, inCols]);

  // Current window position
  const windowRow = Math.floor(currentStep / outDims.cols) * stride;
  const windowCol = (currentStep % outDims.cols) * stride;

  // Current input window
  const inputWindow = useMemo(() => {
    const win = [];
    for (let i = 0; i < filterSize; i++) {
      const row = [];
      for (let j = 0; j < filterSize; j++)
        row.push(paddedData[windowRow + i]?.[windowCol + j] ?? 0);
      win.push(row);
    }
    return win;
  }, [paddedData, windowRow, windowCol, filterSize]);

  const currentOutputValue = currentStep < maxSteps
    ? outputGrid[Math.floor(currentStep / outDims.cols)]?.[currentStep % outDims.cols] ?? 0
    : null;

  // --- Playback ---
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setCurrentStep(prev => {
        if (prev + 1 >= maxSteps) { setIsPlaying(false); return prev; }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(id);
  }, [isPlaying, maxSteps]);

  // Reset on param changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedDatasetId, selectedFilterId, customFilter, stride, paddingVal, operationMode, applyRelu]);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <Link to="/" className="back-home-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Home
        </Link>
        <h1>CNN Convolution Visualizer</h1>
        <p>Interactive visualization of convolution, pooling & transposed convolution</p>
        <div className="header-line" />
      </header>

      {/* Controls */}
      <Controls
        selectedDatasetId={selectedDatasetId} setSelectedDatasetId={setSelectedDatasetId}
        selectedFilterId={selectedFilterId} setSelectedFilterId={setSelectedFilterId}
        customFilter={customFilter} setCustomFilter={setCustomFilter}
        stride={stride} setStride={setStride}
        paddingVal={paddingVal} setPaddingVal={setPaddingVal}
        operationMode={operationMode} setOperationMode={setOperationMode}
        applyRelu={applyRelu} setApplyRelu={setApplyRelu}
        isPlaying={isPlaying}
        togglePlay={() => setIsPlaying(p => !p)}
        stepForward={() => { setIsPlaying(false); setCurrentStep(s => Math.min(s + 1, maxSteps - 1)); }}
        reset={() => { setIsPlaying(false); setCurrentStep(0); }}
      />

      {/* Status tags */}
      <div className="status-bar">
        <span className="tag">Input: <strong>{inRows}×{inCols}</strong></span>
        <span className="tag">Output: <strong>{outDims.rows}×{outDims.cols}</strong></span>
        <span className="tag">Step: <strong>{currentStep + 1}</strong> / {maxSteps}</span>
        <span className="tag">Mode: <strong>{operationMode === 'maxpool' ? 'Max Pool' : operationMode === 'transposed' ? 'Transposed' : 'Conv2D'}</strong></span>
        {applyRelu && <span className="tag" style={{ borderColor: 'rgba(239,68,68,0.4)' }}>🔥 <strong style={{ color: '#f87171' }}>ReLU ON</strong></span>}
      </div>

      {/* Main Visualization */}
      <div className="viz-layout">
        <InputGrid
          data={paddedData}
          windowRow={windowRow}
          windowCol={windowCol}
          filterSize={filterSize}
          hoveredOutputCell={hoveredOutputCell}
          stride={stride}
          paddingVal={paddingVal}
        />

        <div className="viz-arrow"><ArrowSVG /></div>

        <CalculationDisplay
          inputWindow={inputWindow}
          filter={activeFilter}
          outputValue={currentOutputValue}
          operationMode={operationMode}
          applyRelu={applyRelu}
          hoveredCell={hoveredCell}
          setHoveredCell={setHoveredCell}
        />
      </div>

      {/* Output grid below */}
      <OutputGrid
        data={outputGrid}
        currentStep={currentStep}
        applyRelu={applyRelu}
        setHoveredOutputCell={setHoveredOutputCell}
      />
    </div>
  );
}

export default App;
