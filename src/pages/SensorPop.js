import React, { useEffect, useState } from 'react';



const SensorPopup = ({ deviceId, onClose }) => {
    const [loading, setLoading] = useState(true)
    const [sensorParams, setSensorParams] = useState([])

    const fetchSensorValues = async () => {
        try {
          const response = await fetch("http://localhost:4001/api/get-sensor-params", {
            method: "GET",
            headers: { device_id:   deviceId }
          });
          const jsonData = await response.json();
          setSensorParams(jsonData);
          console.log(jsonData);
        } catch (err) {
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchSensorValues();
      }, []);
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Device ID: {deviceId}</h2>
        {loading ? (
          <h1>Loading...</h1>
        ) : sensorParams.length > 0 ? (
          <ul className="">
            {sensorParams.map((sv) => (
              <li
                key={sv.sensor_id}
              >{sv.key}</li>
            ))}
          </ul>
        ) : (
          <h1>No Sensors</h1>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SensorPopup;
