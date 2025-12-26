import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ 
  isOpen, 
  onClose, 
  categories, 
  activeCategory, 
  onCategoryChange,
  placemarks,
  onPlacemarkSelect,
  cityName = "Казань"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              zIndex: 999,
              backdropFilter: 'blur(2px)'
            }}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '320px',
              height: '100vh',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 1000,
              boxShadow: '4px 0 30px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            {/* Заголовок */}
            <div style={{ 
              padding: '25px 20px',
              background: 'linear-gradient(135deg, #E84236 0%, #FF7043 100%)',
              color: 'white'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px'
              }}>
                <h1 style={{ 
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  
                  Kazanecc
                </h1>
                <button
                  onClick={onClose}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  ✕
                </button>
              </div>
              <div style={{ 
                fontSize: '16px',
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '5px'
              }}>
               
                Достопримечательности Казани {cityName}
              </div>
            </div>
            
            {/* Контент */}
            <div style={{ 
              flex: 1,
              overflow: 'auto',
              padding: '20px'
            }}>
              
              {/* Категории */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#1b1f3b',
                  marginBottom: '15px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '22px' }}>🏷️</span>
                  Категории
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px'
                }}>
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onCategoryChange(category.id)}
                      style={{
                        background: activeCategory === category.id 
                          ? category.color 
                          : 'rgba(248, 248, 248, 0.8)',
                        color: activeCategory === category.id 
                          ? 'white' 
                          : '#333',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                        backdropFilter: 'blur(10px)',
                        border: activeCategory === category.id 
                          ? 'none' 
                          : '1px solid rgba(255,255,255,0.5)'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{category.icon}</span>
                      <span>{category.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Список мест */}
              <div>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <h3 style={{ 
                    color: '#1b1f3b',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '22px' }}>📍</span>
                    Места
                  </h3>
                  <span style={{ 
                    background: '#E84236',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {placemarks.length}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {placemarks.map(placemark => {
                    const category = categories.find(c => c.id === placemark.category);
                    return (
                      <motion.div
                        key={placemark.id}
                        whileHover={{ x: 4 }}
                        onClick={() => onPlacemarkSelect(placemark)}
                        style={{
                          padding: '15px',
                          background: 'rgba(248, 248, 248, 0.8)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          borderLeft: `4px solid ${category?.color || '#E84236'}`,
                          border: '1px solid rgba(255,255,255,0.5)'
                        }}
                      >
                        <div style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '8px'
                        }}>
                          <h4 style={{ 
                            margin: 0,
                            fontSize: '16px',
                            color: '#1b1f3b',
                            fontWeight: 'bold',
                            lineHeight: '1.3'
                          }}>
                            {placemark.title}
                          </h4>
                          <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <span style={{ 
                              color: '#FFC700',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}>
                              ★
                            </span>
                            <span style={{ 
                              color: '#666',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}>
                              {placemark.rating}
                            </span>
                          </div>
                        </div>
                        
                        <p style={{ 
                          margin: 0,
                          fontSize: '13px',
                          color: '#666',
                          marginBottom: '10px',
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {placemark.description}
                        </p>
                        
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ 
                            fontSize: '12px',
                            color: category?.color,
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <span style={{ fontSize: '14px' }}>{category?.icon}</span>
                            {category?.name}
                          </span>
                          <span style={{ 
                            fontSize: '14px',
                            color: '#E84236',
                            fontWeight: 'bold'
                          }}>
                            {placemark.price}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Футер */}
            <div style={{ 
              padding: '20px',
              background: 'rgba(248, 248, 248, 0.9)',
              borderTop: '1px solid rgba(255,255,255,0.5)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ 
                color: '#666',
                fontSize: '12px',
                textAlign: 'center',
                lineHeight: '1.5'
              }}>
                <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                  Карта достопримечательностей Казани
                </div>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>
                  Используйте карту для навигации. Нажмите на метку для подробностей.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;