// ZoomControls.jsx
import React from 'react';

const ZoomControls = ({ mapRef, onZoomChange, currentZoom }) => {
  if (!mapRef.current) return null;

  return (
    <div 
      className="zoom-controls"
      style={{
        position: 'absolute',
        bottom: '100px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}
    >
      <button
        onClick={() => onZoomChange(1)}
        className="zoom-btn zoom-in"
      >
        +
      </button>
      <div className="zoom-display">
        {Math.round(currentZoom)}
      </div>
      <button
        onClick={() => onZoomChange(-1)}
        className="zoom-btn zoom-out"
      >
        −
      </button>
    </div>
  );
};

export default ZoomControls;