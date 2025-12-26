import React from "react";

const PlacemarkInfo = ({ placemark, categories, onClose }) => {
  if (!placemark) return null;

  const category = categories.find((c) => c.id === placemark.category);

  return (
    <div
      className="placemark-info-panel"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        zIndex: 1000,
        width: "90%",
        maxWidth: "500px",
        maxHeight: "300px",
        overflow: "auto",
      }}
    >
      <button
        onClick={onClose}
        className="close-info-btn"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: "#666",
        }}
      >
        ✕
      </button>

      <h3
        style={{
          color: "#E84236",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            width: "12px",
            height: "12px",
            background: category?.color,
            borderRadius: "50%",
          }}
        ></span>
        {placemark.title}
      </h3>

      <p style={{ color: "#666", marginBottom: "10px" }}>
        {placemark.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div className="rating">
            {"★".repeat(Math.floor(placemark.rating))}
            <span className="rating-empty">
              {"★".repeat(5 - Math.floor(placemark.rating))}
            </span>
            <span className="rating-value">{placemark.rating}</span>
          </div>
          <div className="address">{placemark.address}</div>
        </div>
        <div className="price-tag">{placemark.price}</div>
      </div>
    </div>
  );
};

export default PlacemarkInfo;
