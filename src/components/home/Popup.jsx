import React from "react";

export default function Popup({ onClose }) {
  return (
    <div className="popup-bg" onClick={onClose}>
      <div className="popup">
        <button onClick={onClose}>Close Popup</button>
        <div>
          <h2>Hello World!</h2>
        </div>
      </div>
    </div>
  );
}
