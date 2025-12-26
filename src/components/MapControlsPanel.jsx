import React from "react";

const MapControlsPanel = ({
  isOpen,
  onClose,
  settings,
  imageBounds,
  onSettingsChange,
  onBoundsChange,
  onMoveBounds,
  onReset,
  currentZoom,
}) => {
  if (!isOpen) return null;

  const handleBoundsChange = (corner, value, index) => {
    const newBounds = [...imageBounds];
    if (corner === "nw") {
      newBounds[1][index] = parseFloat(value) || 0;
    } else {
      newBounds[0][index] = parseFloat(value) || 0;
    }
    onBoundsChange(newBounds);
  };

  return (
    <div
      className="map-controls-panel"
      style={{
        position: "absolute",
        top: "140px",
        right: "20px",
        zIndex: 999,
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        width: "380px",
        maxHeight: "85vh",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: 0, color: "#526ED3" }}>Настройки карты</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#666",
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          marginBottom: "25px",
          padding: "15px",
          background: "#f8f8f8",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>Настройки зума</h4>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Скорость зума колесом: {settings.zoomWheelSpeed.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.1"
            value={settings.zoomWheelSpeed}
            onChange={(e) =>
              onSettingsChange({ zoomWheelSpeed: parseFloat(e.target.value) })
            }
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Скорость зума кнопками: {settings.zoomSpeed.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={settings.zoomSpeed}
            onChange={(e) =>
              onSettingsChange({ zoomSpeed: parseFloat(e.target.value) })
            }
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Прозрачность карты: {Math.round(settings.imageOpacity * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={settings.imageOpacity}
          onChange={(e) =>
            onSettingsChange({ imageOpacity: parseFloat(e.target.value) })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Прозрачность OSM карты: {Math.round(settings.tileLayerOpacity * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={settings.tileLayerOpacity}
          onChange={(e) =>
            onSettingsChange({ tileLayerOpacity: parseFloat(e.target.value) })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#333" }}>
          Границы изображения:
        </h4>

        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
            Северо-запад (верхний левый):
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <input
              type="number"
              step="0.001"
              value={imageBounds[1][0].toFixed(3)}
              onChange={(e) => handleBoundsChange("nw", e.target.value, 0)}
              placeholder="Широта"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <input
              type="number"
              step="0.001"
              value={imageBounds[1][1].toFixed(3)}
              onChange={(e) => handleBoundsChange("nw", e.target.value, 1)}
              placeholder="Долгота"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        </div>

        <div>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
            Юго-восток (нижний правый):
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <input
              type="number"
              step="0.001"
              value={imageBounds[0][0].toFixed(3)}
              onChange={(e) => handleBoundsChange("se", e.target.value, 0)}
              placeholder="Широта"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <input
              type="number"
              step="0.001"
              value={imageBounds[0][1].toFixed(3)}
              onChange={(e) => handleBoundsChange("se", e.target.value, 1)}
              placeholder="Долгота"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", color: "#333" }}>
          Перемещение изображения:
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <button onClick={() => onMoveBounds("up")} className="move-btn">
            ↑
          </button>
          <button onClick={() => onMoveBounds("left")} className="move-btn">
            ←
          </button>
          <button onClick={() => onMoveBounds("right")} className="move-btn">
            →
          </button>
          <button onClick={() => onMoveBounds("down")} className="move-btn">
            ↓
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <button onClick={onReset} className="control-btn reset-btn">
          Сброс
        </button>
        <button onClick={onClose} className="control-btn apply-btn">
          Применить
        </button>
      </div>
    </div>
  );
};

export default MapControlsPanel;
