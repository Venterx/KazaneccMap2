import React from "react";
import "./ControlButtons.css";

const ControlButtons = ({
  isSidebarOpen,
  isControlsOpen,
  onToggleSidebar,
  onToggleControls,
}) => {
  return (
    <div className="buttons-container">
      <button
        onClick={onToggleSidebar}
        className={`control-button menu-button ${
          isSidebarOpen ? "sidebar-open" : ""
        }`}
        aria-label={isSidebarOpen ? "Меню открыто" : "Открыть меню"}
      >
        <span className="button-icon">☰</span>
        <span className="button-text">
          {isSidebarOpen ? "Скрыть меню" : "Меню"}
        </span>
      </button>




      {/* Закомментить эту кнопку чтобы убрать настройки */}
      <button
        onClick={onToggleControls}
        className={`control-button settings-button ${
          isControlsOpen ? "controls-open" : ""
        }`}
      >
        <span className="button-text">
          {isControlsOpen ? "Скрыть настройки" : "Настройки"}
        </span>
      </button>
    </div>
  );
};

export default ControlButtons;
