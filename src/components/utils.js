
import L from 'leaflet';

// 1. ДОБАВЬТЕ ГРАНИЦЫ КАЗАНИ В КОНСТАНТЫ
export const KAZAN_BOUNDS = [
  [55.50, 48.50], // Юго-запад
  [56.10, 49.70]  // Северо-восток
];

// 2. ОБНОВИТЕ DEFAULT_SETTINGS - добавьте mapBounds
export const DEFAULT_SETTINGS = {
  center: [55.7963, 49.1083],
  defaultZoom: 13,
  minZoom: 13,
  maxZoom: 16,
  imageBounds: [[55.721, 48.987], [55.852, 49.264]],
  mapBounds: KAZAN_BOUNDS, // Добавьте эту строку
  zoomSpeed: 0.5,
  zoomWheelSpeed: 0.5,
  imageOpacity: 1,
  tileLayerOpacity: 0.3
};

// 3. ДОБАВЬТЕ ФУНКЦИЮ ДЛЯ ПРОВЕРКИ ГРАНИЦ (опционально)
export const isWithinKazanBounds = (latlng) => {
  const bounds = L.latLngBounds(KAZAN_BOUNDS);
  return bounds.contains(latlng);
};

// 4. ДОБАВЬТЕ ФУНКЦИЮ ДЛЯ ОГРАНИЧЕНИЯ КООРДИНАТ
export const clampToKazanBounds = (latlng) => {
  const bounds = L.latLngBounds(KAZAN_BOUNDS);
  const lat = Math.max(bounds.getSouth(), Math.min(bounds.getNorth(), latlng.lat));
  const lng = Math.max(bounds.getWest(), Math.min(bounds.getEast(), latlng.lng));
  return L.latLng(lat, lng);
};

// 5. ДОБАВЬТЕ ФУНКЦИЮ ДЛЯ ЦЕНТРИРОВАНИЯ КАРТЫ В КАЗАНИ
export const flyToKazan = (map, zoom = 13, duration = 1) => {
  if (map) {
    map.flyTo(DEFAULT_SETTINGS.center, zoom, {
      duration: duration,
      easeLinearity: 0.25
    });
  }
};

// 6. ОБНОВИТЕ ФУНКЦИЮ moveBounds, ЧТОБЫ НЕ ВЫХОДИТЬ ЗА ГРАНИЦЫ
export const moveBounds = (bounds, direction, amount = 0.01) => {
  const newBounds = [...bounds];
  
  switch(direction) {
    case 'up':
      newBounds[0][0] += amount;
      newBounds[1][0] += amount;
      break;
    case 'down':
      newBounds[0][0] -= amount;
      newBounds[1][0] -= amount;
      break;
    case 'left':
      newBounds[0][1] -= amount;
      newBounds[1][1] -= amount;
      break;
    case 'right':
      newBounds[0][1] += amount;
      newBounds[1][1] += amount;
      break;
    case 'zoom-in':
      newBounds[0][0] += amount/2;
      newBounds[0][1] += amount/2;
      newBounds[1][0] -= amount/2;
      newBounds[1][1] -= amount/2;
      break;
    case 'zoom-out':
      newBounds[0][0] -= amount/2;
      newBounds[0][1] -= amount/2;
      newBounds[1][0] += amount/2;
      newBounds[1][1] += amount/2;
      break;
  }
  
  // Проверяем, не вышли ли за границы Казани
  const kazanBounds = L.latLngBounds(KAZAN_BOUNDS);
  const movedBounds = L.latLngBounds(newBounds[0], newBounds[1]);
  
  // Если новые границы выходят за пределы Казани, возвращаем старые
  if (!kazanBounds.contains(movedBounds.getNorthEast()) || 
      !kazanBounds.contains(movedBounds.getSouthWest())) {
    console.warn('Движение за пределы Казани заблокировано');
    return bounds;
  }
  
  return newBounds;
};


export const createCustomIcon = (categories, category, isActive = false) => {
  const categoryInfo = categories.find(cat => cat.id === category) || categories[0];
  
  // УВЕЛИЧИЛИ РАЗМЕРЫ:
  const size = isActive ? 48 : 40; // Было 32 и 28
  const iconSize = [size, size];
  const iconAnchor = [size / 2, size];
  const popupAnchor = [0, -size];
  
  return L.divIcon({
    className: 'custom-placemark' + (isActive ? ' active' : ''),
    html: `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" style="
        filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));
        transform: translateY(-${size * 0.1}px);
      ">
        <!-- Форма placemark (капля) -->
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" 
              fill="${categoryInfo.color}" 
              stroke="white" 
              stroke-width="2"/> <!-- Увеличили stroke -->
        
        <!-- Внутренний круг -->
        <circle cx="12" cy="9" r="3.5" fill="white"/> <!-- Увеличили радиус -->
        
        <!-- Точка в центре -->
        <circle cx="12" cy="9" r="1.5" fill="${categoryInfo.color}"/> <!-- Увеличили радиус -->
      </svg>
    `,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
  });
};

export const filterPlacemarks = (placemarks, activeCategory) => {
  return activeCategory === 'all' 
    ? placemarks 
    : placemarks.filter(p => p.category === activeCategory);
};