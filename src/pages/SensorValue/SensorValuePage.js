import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GaugeChart from 'react-gauge-chart';

import './SensorValuePage.css'

const SensorValuePage = () => {
  const [loading, setLoading] = useState(true);
  const [sensorParams, setSensorParams] = useState([]);
  const [sensorValues, setSensorValues] = useState([])
  const { "device_id": deviceId } = useParams();
  const [sensorValues1, setSensorValues1] = useState([])

  const encodedDeviceId = encodeURIComponent(deviceId)

  function calculatePercent(value, minValue, maxValue) {
    if (value < minValue) {
      return 0.0;
    } if (value > maxValue) {
      return 1.0;
    }
      return (value - minValue) / (maxValue - minValue);
    
  }
  
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
      setSensorValues1(jsonData);
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
        <>
          <p>Loaded</p>
          {sensorValues1.map((dataItem) => (
            <div className='chart' key={dataItem.sensor_id}>
              <GaugeChart
                id="sensor-gauge"
                nrOfLevels={10}
                colors={["#FF5F6D", "#FFC371"]}
                textColor="#000000" 
                arcWidth={0.34}
                percent={calculatePercent(dataItem.value, dataItem.minvalue, dataItem.maxvalue)}
                key={dataItem.sensor_id}
                animate
              />
              <center key={dataItem.device_id}>
                {dataItem.key} : {dataItem.value !== null ? dataItem.value : 'Loading...'} {dataItem.siunit}
                <div>
                  Minimum value: {dataItem.minvalue} 
                </div>
                <div>
                  Maximum value: {dataItem.maxvalue}
                </div>
                <p>{dataItem.value}</p>
              </center>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SensorValuePage;
