import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker } from 'react-leaflet';
import L from 'leaflet';
import { kazanPlacemarks, categories } from '../data/kazanPlacemarks';
import Sidebar from './Sidebar';
import MapControlsPanel from './MapControlsPanel';
import DebugPanel from './DebugPanel';
import ControlButtons from './ControlButtons';
import PlacemarkModal from './PlacemarkModal';

import { 
  createCustomIcon, 
  filterPlacemarks, 
  DEFAULT_SETTINGS, 
  moveBounds,
  KAZAN_BOUNDS,  
  flyToKazan  
} from './utils';

const KazanMap = () => {
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPlacemark, setSelectedPlacemark] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_SETTINGS.defaultZoom);
  
  
  const [settings, setSettings] = useState({
    ...DEFAULT_SETTINGS,
    imageUrl: '/images/kazan-map.jpg'
  });
  const [imageBounds, setImageBounds] = useState(DEFAULT_SETTINGS.imageBounds);
  
  const mapRef = useRef(null);

 
  const handleZoomChange = (zoomDelta) => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      const newZoom = Math.min(Math.max(currentZoom + zoomDelta, 13), 18);
      mapRef.current.flyTo(mapRef.current.getCenter(), newZoom, {
        duration: 0.5,
        easeLinearity: 0.25
      });
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefault = () => {
    setSettings(DEFAULT_SETTINGS);
    setImageBounds(DEFAULT_SETTINGS.imageBounds);
    setCurrentZoom(DEFAULT_SETTINGS.defaultZoom);
    if (mapRef.current) {
      mapRef.current.flyTo(DEFAULT_SETTINGS.center, DEFAULT_SETTINGS.defaultZoom, { duration: 1 });
    }
  };

  const handleMapCreated = (map) => {
    mapRef.current = map;
    map.scrollWheelZoom.setZoomRate(settings.zoomWheelSpeed);
    map.on('zoom', () => {
      setCurrentZoom(map.getZoom());
    });
  };

  const handlePlacemarkClick = (placemark) => {
    setSelectedPlacemark(placemark);
   
  };

  const filteredPlacemarks = filterPlacemarks(kazanPlacemarks, activeCategory);

  return (
    <div className="kazan-map-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        placemarks={filteredPlacemarks}
        onPlacemarkSelect={(placemark) => {
          handlePlacemarkClick(placemark);
          setIsSidebarOpen(false);
         
        }}
        cityName="Казань"
      />

      <ControlButtons 
        isSidebarOpen={isSidebarOpen}
        isControlsOpen={isControlsOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleControls={() => setIsControlsOpen(!isControlsOpen)}
      />

      <MapControlsPanel 
        isOpen={isControlsOpen}
        onClose={() => setIsControlsOpen(false)}
        settings={settings}
        imageBounds={imageBounds}
        onSettingsChange={updateSettings}
        onBoundsChange={setImageBounds}
        onMoveBounds={(direction) => setImageBounds(prev => moveBounds(prev, direction))}
        onReset={resetToDefault}
        currentZoom={currentZoom}
        onFlyToKazan={() => flyToKazan(mapRef.current)}
      />
      
      <MapContainer
        center={settings.center}
        zoom={settings.defaultZoom}
        ref={mapRef}
        style={{ 
          height: '100%', 
          width: '100%',
          filter: selectedPlacemark ? 'brightness(0.7)' : 'none',
          transition: 'filter 0.3s ease'
        }}
        zoomControl={false}
        minZoom={settings.minZoom}
        maxZoom={settings.maxZoom}
        zoomSnap={0.25}
        zoomDelta={settings.zoomSpeed}
        wheelDebounceTime={50}
        wheelPxPerZoomLevel={60}
        maxBounds={[
          [55.70, 48.95], 
          [55.90, 49.30]  
        ]}
        maxBoundsViscosity={0.75}
        whenCreated={handleMapCreated}
        dragging={!selectedPlacemark}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={settings.tileLayerOpacity}
        />

        <ImageOverlay
          url={settings.imageUrl}
          bounds={imageBounds}
          opacity={settings.imageOpacity}
          zIndex={100}
        />

        {filteredPlacemarks.map((placemark) => (
          <Marker
            key={placemark.id}
            position={placemark.coordinates}
            icon={createCustomIcon(categories, placemark.category, selectedPlacemark?.id === placemark.id)}
            eventHandlers={{
              click: () => handlePlacemarkClick(placemark),
            }}
          />
        ))}
      </MapContainer>

      <PlacemarkModal 
        placemark={selectedPlacemark}
        categories={categories}
        onClose={() => setSelectedPlacemark(null)}
        mapRef={mapRef}
      />

    
    </div>
  );
};

export default KazanMap;