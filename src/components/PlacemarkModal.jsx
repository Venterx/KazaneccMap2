import React, { useRef, useEffect } from 'react';
import './PlacemarkModal.css';
const PlacemarkModal = ({ 
  placemark, 
  categories, 
  onClose,
  mapRef 
}) => {
  const modalRef = useRef(null);

  // Закрытие окна при клике на фон
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (placemark) {
      document.addEventListener('mousedown', handleClickOutside);
      // Блокируем скролл карты при открытом окне
      if (mapRef.current) {
        mapRef.current.scrollWheelZoom.disable();
        mapRef.current.dragging.disable();
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Восстанавливаем скролл карты
      if (mapRef.current) {
        mapRef.current.scrollWheelZoom.enable();
        mapRef.current.dragging.enable();
      }
    };
  }, [placemark, onClose, mapRef]);

  if (!placemark) return null;

  const categoryInfo = categories.find(c => c.id === placemark.category);

  return (
    <>
      {/* Затемнение и блюр фона */}
      <div 
        className="map-overlay active"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'auto',
          zIndex: 999,
          transition: 'all 0.3s ease'
        }}
      />

      {/* Модальное окно */}
      <div 
        ref={modalRef}
        className="placemark-modal"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '350px',
          maxHeight: '85vh',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.4s ease-out'
        }}
      >
        {/* Заголовок с кнопкой закрытия */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px 16px',
          borderBottom: '1px solid #eee',
          backgroundColor: '#f8f9fa',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: categoryInfo?.color || '#E84236'
            }} />
            <h3 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: 600,
              color: '#333'
            }}>
              {placemark.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#999',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              lineHeight: 1
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            &times;
          </button>
        </div>

        {/* Контент окна с прокруткой */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px'
        }}>
          {/* Категория */}
          {categoryInfo && (
            <div style={{
              display: 'inline-block',
              backgroundColor: `${categoryInfo.color}20`,
              color: categoryInfo.color,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '20px'
            }}>
              {categoryInfo.name}
            </div>
          )}

          {/* Описание */}
          <p style={{
            margin: '0 0 24px 0',
            color: '#555',
            lineHeight: 1.6,
            fontSize: '15px'
          }}>
            {placemark.description}
          </p>

          {/* Рейтинг и цена */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px'
          }}>
            <div>
              <div style={{ 
                color: '#FFC700', 
                fontSize: '20px',
                letterSpacing: '2px'
              }}>
                {'★'.repeat(Math.floor(placemark.rating))}
                <span style={{ color: '#e0e0e0' }}>
                  {'★'.repeat(5 - Math.floor(placemark.rating))}
                </span>
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#888',
                marginTop: '4px'
              }}>
                {placemark.rating}/5
              </div>
            </div>
            <div style={{ 
              fontSize: '20px', 
              fontWeight: 'bold',
              color: '#E84236'
            }}>
              {placemark.price}
            </div>
          </div>

          {/* Дополнительная информация */}
          {placemark.address && (
            <InfoSection title="Адрес" content={placemark.address} />
          )}

          {placemark.workingHours && (
            <InfoSection title="Время работы" content={placemark.workingHours} />
          )}

          {placemark.phone && (
            <InfoSection title="Телефон" content={placemark.phone} />
          )}

          {/* Кнопки действий */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #eee'
          }}>
            <ActionButton 
              text="Показать маршрут" 
              primary 
              onClick={() => console.log('Маршрут к:', placemark.title)}
            />
            <ActionButton 
              text="Сохранить" 
              onClick={() => console.log('Сохранено:', placemark.title)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Вспомогательный компонент для секции информации
const InfoSection = ({ title, content }) => (
  <div style={{ marginBottom: '16px' }}>
    <h4 style={{ 
      margin: '0 0 8px 0', 
      fontSize: '15px',
      color: '#666'
    }}>
      {title}
    </h4>
    <p style={{ 
      margin: 0, 
      color: '#333',
      fontSize: '14px'
    }}>
      {content}
    </p>
  </div>
);

// Вспомогательный компонент для кнопок действий
const ActionButton = ({ text, primary = false, onClick }) => {
  const primaryStyle = {
    backgroundColor: '#E84236',
    color: 'white',
    ':hover': { backgroundColor: '#d62c20' }
  };
  
  const secondaryStyle = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    ':hover': { backgroundColor: '#e0e0e0' }
  };

  const style = primary ? primaryStyle : secondaryStyle;

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '14px',
        border: 'none',
        borderRadius: '12px',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        ...style
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 
        primary ? '#d62c20' : '#e0e0e0'
      }
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 
        primary ? '#E84236' : '#f0f0f0'
      }
    >
      {text}
    </button>
  );
};

export default PlacemarkModal;