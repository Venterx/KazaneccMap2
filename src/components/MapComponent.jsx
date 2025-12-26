import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  ImageOverlay,
  Marker,
  ZoomControl,
} from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";

import Sidebar from "./Sidebar";

const MapComponent = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPlacemark, setSelectedPlacemark] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const createCustomIcon = (category, isActive = false) => {
    const categoryInfo =
      categories.find((cat) => cat.id === category) || categories[0];

    return L.divIcon({
      className: "custom-marker" + (isActive ? " active" : ""),
      html: `<div style="
        background: ${categoryInfo.color};
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px ${categoryInfo.color}40;
      "></div>`,
      iconSize: isActive ? [28, 28] : [24, 24],
      iconAnchor: isActive ? [14, 14] : [12, 12],
      popupAnchor: [0, -14],
    });
  };

  const filteredPlacemarks =
    activeCategory === "all"
      ? placemarks
      : placemarks.filter((p) => p.category === activeCategory);

  const imageUrl = "/images/kazan-map.jpg";
  const imageBounds = [
    [55.74, 49.07],
    [55.85, 49.21],
  ];

  const center = [55.7963, 49.1083];
  const zoom = 11;

  return (
    <div
      className="map-container"
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        placemarks={filteredPlacemarks}
        onPlacemarkSelect={(placemark) => {
          setSelectedPlacemark(placemark);
          setIsSidebarOpen(false);
        }}
      />

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "#E84236",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 20px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0.2)",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "24px" }}>☰</span>
        Меню
      </button>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        minZoom={13}
        maxZoom={16}
        maxBounds={[
          [55.7, 48.95],
          [55.9, 49.3],
        ]}
        maxBoundsViscosity={0.75}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.3}
        />

        <ImageOverlay
          url={imageUrl}
          bounds={imageBounds}
          opacity={1}
          zIndex={100}
        />

        <AnimatePresence>
          {filteredPlacemarks.map((placemark) => (
            <Marker
              key={placemark.id}
              position={placemark.coordinates}
              icon={createCustomIcon(
                placemark.category,
                selectedPlacemark?.id === placemark.id
              )}
              eventHandlers={{
                click: () => setSelectedPlacemark(placemark),
              }}
            />
          ))}
        </AnimatePresence>
      </MapContainer>

      {selectedPlacemark && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
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
            onClick={() => setSelectedPlacemark(null)}
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
                background: categories.find(
                  (c) => c.id === selectedPlacemark.category
                )?.color,
                borderRadius: "50%",
              }}
            ></span>
            {selectedPlacemark.title}
          </h3>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            {selectedPlacemark.description}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  color: "#FFC700",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {"★".repeat(Math.floor(selectedPlacemark.rating))}
                <span style={{ color: "#ccc" }}>
                  {"★".repeat(5 - Math.floor(selectedPlacemark.rating))}
                </span>
                <span style={{ color: "#666", marginLeft: "8px" }}>
                  {selectedPlacemark.rating}
                </span>
              </div>
              <div style={{ color: "#66", marginTop: "5px" }}>
                {selectedPlacemark.address}
              </div>
            </div>
            <div
              style={{
                background: "#f0f0f0",
                padding: "8px 16px",
                borderRadius: "20px",
                fontWeight: "bold",
                color: "#E84236",
              }}
            >
              {selectedPlacemark.price}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MapComponent;
