// DebugPanel.jsx
import React from "react";

const DebugPanel = ({ settings, currentZoom, imageBounds }) => {
  return (
    <div
      className="debug-panel"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "10px",
        borderRadius: "6px",
        fontSize: "12px",
        zIndex: 1000,
        maxWidth: "300px",
      }}
    >
      <div>
        <strong>Текущие настройки:</strong>
      </div>
      <div>Зум: {currentZoom?.toFixed(1) || "N/A"}x</div>
      <div>Скорость зума: {settings.zoomWheelSpeed.toFixed(1)}</div>
      <div>Прозрачность: {Math.round(settings.imageOpacity * 100)}%</div>
      <div>
        Границы: {imageBounds[1][0].toFixed(3)}°, {imageBounds[1][1].toFixed(3)}
        °
      </div>
    </div>
  );
};

export default DebugPanel;
