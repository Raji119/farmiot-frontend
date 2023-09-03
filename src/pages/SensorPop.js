import React, { useEffect, useState } from 'react';



const SensorPopup = ({ deviceId, onClose }) => {
    const [loading, setLoading] = useState(true)
    const [sensorValue, setSensorValue] = useState()
    
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Device ID: {deviceId}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SensorPopup;
