import React, { useEffect, useState } from 'react';
import SensorValuePopup from './SensorValuePopup'; // Import the new component

const SensorPopup = ({ deviceId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [sensorParams, setSensorParams] = useState([]);
  const [selectedSensorId, setSelectedSensorId] = useState(null);

  const fetchSensorParams = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/get-sensor-params", {
        method: "GET",
        headers: { device_id: deviceId }
      });
      const jsonData = await response.json();
      setSensorParams(jsonData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorParams();
  }, []);

  const handleSensorClick = (sensorId) => {
    setSelectedSensorId(sensorId);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Device ID: {deviceId}</h2>
        {loading ? (
          <h1>Loading...</h1>
        ) : sensorParams.length > 0 ? (
          <ul className="">
            {sensorParams.map((sv) => (
              <button
                key={sv.sensor_id}
                onClick={() => handleSensorClick(sv.sensor_id)}
              >{sv.key}</button>
            ))}
          </ul>
        ) : (
          <h1>No Sensors</h1>
        )}
        <button onClick={onClose}>Close</button>
        {selectedSensorId !== null && (
          <SensorValuePopup
            sensorId={selectedSensorId}
            onClose={() => setSelectedSensorId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default SensorPopup;
