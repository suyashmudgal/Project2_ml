import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Controls } from './components/Controls';
import { InputGrid } from './components/InputGrid';
import { OutputGrid } from './components/OutputGrid';
import { CalculationDisplay } from './components/CalculationDisplay';
import { datasets } from './data/datasets';
import { filters } from './data/filters';

function App() {
  const [selectedDatasetId, setSelectedDatasetId] = useState(datasets[0].id);
  const [selectedFilterId, setSelectedFilterId] = useState(filters[0].id);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // hoveredCell can be { type: 'input'|'output', row, col }
  const [hoveredCell, setHoveredCell] = useState(null);

  const appRef = useRef(null);

  const selectedData = useMemo(() => {
    return datasets.find(d => d.id === selectedDatasetId)?.data || datasets[0].data;
  }, [selectedDatasetId]);

  const selectedFilter = useMemo(() => {
    return filters.find(f => f.id === selectedFilterId)?.data || filters[0].data;
  }, [selectedFilterId]);

  const rows = selectedData.length;
  const cols = selectedData[0].length;
  const outRows = rows - 2;
  const outCols = cols - 2;
  const maxSteps = outRows * outCols;

  // Pre-calculate the entire output grid so we don't recalculate everything on each render
  const outputGrid = useMemo(() => {
    const grid = [];
    for (let r = 0; r < outRows; r++) {
      const row = [];
      for (let c = 0; c < outCols; c++) {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            sum += selectedData[r + i][c + j] * selectedFilter[i][j];
          }
        }
        row.push(sum);
      }
      grid.push(row);
    }
    return grid;
  }, [selectedData, selectedFilter]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev + 1 >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 50); // 50ms per step = 20 steps per second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxSteps]);

  // Reset when data or filter changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedDatasetId, selectedFilterId]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      appRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const windowRow = Math.floor(currentStep / outCols);
  const windowCol = currentStep % outCols;

  // Extract the current 3x3 input window
  const inputWindow = useMemo(() => {
    const win = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        if (windowRow + i < rows && windowCol + j < cols) {
          row.push(selectedData[windowRow + i][windowCol + j]);
        } else {
          row.push(0);
        }
      }
      win.push(row);
    }
    return win;
  }, [selectedData, windowRow, windowCol, rows, cols]);

  const currentOutputValue = currentStep < maxSteps ? outputGrid[windowRow][windowCol] : null;

  return (
    <div className="app-container" ref={appRef} style={{ background: isFullScreen ? 'var(--bg-color)' : '' }}>
      <div className="header">
        <h1 className="title">Convolution Visualizer</h1>
      </div>

      <Controls 
        selectedDatasetId={selectedDatasetId}
        setSelectedDatasetId={setSelectedDatasetId}
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        isPlaying={isPlaying}
        togglePlay={() => setIsPlaying(!isPlaying)}
        stepForward={() => {
          setIsPlaying(false);
          setCurrentStep(s => Math.min(s + 1, maxSteps - 1));
        }}
        reset={() => {
          setIsPlaying(false);
          setCurrentStep(0);
        }}
        isFullScreen={isFullScreen}
        toggleFullScreen={toggleFullScreen}
      />

      <div className="main-content">
        <InputGrid 
          data={selectedData} 
          currentStep={currentStep} 
          hoveredCell={hoveredCell}
          setHoveredCell={setHoveredCell}
        />
        
        <CalculationDisplay 
          inputWindow={inputWindow}
          filter={selectedFilter}
          outputValue={currentOutputValue}
          hoveredCell={hoveredCell}
          setHoveredCell={setHoveredCell}
        />
        
        <OutputGrid 
          data={outputGrid} 
          currentStep={currentStep} 
          hoveredCell={hoveredCell}
          setHoveredCell={setHoveredCell}
        />
      </div>
    </div>
  );
}

export default App;
