import React, { useEffect, useState } from 'react';


const SensorPopup = ({ deviceId, onClose }) => {
    const [loading, setLoading] = useState(true)
    const [sensorParams, setSensorParams] = useState([])
    const [sensorValues, setSensorValues] = useState([])

    const fetchSensorParams = async () => {
        try {
          const response = await fetch("http://localhost:4001/api/get-sensor-params", {
            method: "GET",
            headers: { device_id: deviceId }
          });
          const jsonData = await response.json();
          setSensorParams(jsonData);
          // console.log(jsonData);
        } catch (err) {
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      };

      const fetchSensorValue = async(sensorId) => {
        try {
          const response = await fetch("http://localhost:4001/api/get-sensor-value", {
            method: "GET",
            headers: { sensor_id: sensorId }
          });
          const jsonData = await response.json();
          setSensorValues(jsonData);
          // console.log(jsonData[0].value);
          console.log(sensorValues[0].value);
          alert(sensorValues[0].value)
        } catch (err) {
          console.error(err.message);
        } 
      }
    
      useEffect(() => {
        fetchSensorParams();
      }, []);

      useEffect(() => {
        // This effect will be triggered whenever sensorValues changes
        if (sensorValues.length > 0) {
          console.log(sensorValues[0].value);
          alert(sensorValues[0].value);
        }
      }, [sensorValues]);
    
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
                onClick={() => fetchSensorValue(sv.sensor_id)}
              >{sv.key}</button>
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
