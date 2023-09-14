import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './SensorValuePage.css'
import Sensor from './Sensor';

const SensorValuePage = () => {
  const [loading, setLoading] = useState(true);
  const { "device_id": deviceId } = useParams();
  const [sensorValues, setSensorValues] = useState([])

  const encodedDeviceId = encodeURIComponent(deviceId)

  function calculatePercent(value, minValue, maxValue) {
    if (value < minValue) {
      return 0.0;
    } if (value > maxValue) {
      return 1.0;
    }
      return (value - minValue) / (maxValue - minValue);
  }

  const patternMatch = (parameter) => {

    parameter = parameter.toLowerCase()

    if (parameter.includes("current")){
      return 1
    }
    if (parameter.includes("voltage")){
      return 2
    }
    if (parameter.includes("temperature")){
      return 3
    }
    return 4
  }
  
  const val = patternMatch("abc jk voltage temperaturEnb jh")
  console.log(val);

  const fetchSensorParams = async () => {
    try {
      // Fetch sensor parameters
      const response = await fetch("http://localhost:4001/api/get-sensor-value1", {
        method: "GET",
        headers: { device_id: encodedDeviceId }
      });

      if (!response.ok) {
            // Handle non-OK response (e.g., 404 or 500)
            alert(`Failed to fetch sensor parameters: ${response.status}`);
      }

      const jsonData = await response.json();
      setSensorValues(jsonData);
      // console.log(`Fetched New sensor value for sensor:`, jsonData);
      setLoading(true)
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSensorParams();
  }, [deviceId]);

  return (
    <div>
      {!loading ? (
        <center className='flex-box'>
          {sensorValues.map((dataItem) => {
            const type = patternMatch(dataItem.key);
            return <Sensor 
              type={type} 
              sensorId={dataItem.sensor_id}
              minvalue={dataItem.minvalue}
              maxvalue={dataItem.maxvalue}
              deviceKey={dataItem.key}
              value={dataItem.value}
              siunit={dataItem.siunit}
              deviceId={deviceId}
            />
          })}
        </center>
      ) : (
        <p>Loading...</p>
      )}
  
        
    </div>
  );
  
};

export default SensorValuePage;
