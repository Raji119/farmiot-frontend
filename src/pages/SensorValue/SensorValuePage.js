import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GaugeChart from 'react-gauge-chart';

import './SensorValuePage.css'

const SensorValuePage = () => {
  const [loading, setLoading] = useState(true);
  const [sensorParams, setSensorParams] = useState([]);
  const [sensorValues, setSensorValues] = useState([])
  const { "device_id": deviceId } = useParams();

  const encodedDeviceId = encodeURIComponent(deviceId)

  const fetchSensorParams = async () => {
    try {
      // Fetch sensor parameters
      const response = await fetch("http://localhost:4001/api/get-sensor-params", {
        method: "GET",
        headers: { device_id: encodedDeviceId }
      });

      if (!response.ok) {
        // Handle non-OK response (e.g., 404 or 500)
        throw new Error(`Failed to fetch sensor parameters: ${response.status}`);
      }

      const jsonData = await response.json();
      setSensorParams(jsonData);
      console.log(jsonData);

      console.log("Fetched sensor parameters:", jsonData);

      // Fetch sensor values for each sensor parameter
      const sensorValuePromises = jsonData.map(async (sp) => {
        const sensorId = sp.sensor_id;
        try {
          const response = await fetch("http://localhost:4001/api/get-sensor-value", {
            method: "GET",
            headers: { sensor_id: sensorId }
          });

          if (!response.ok) {
            // Handle non-OK response for sensor value
            throw new Error(`Failed to fetch sensor value for sensor ${sensorId}: ${response.status}`);
          }

          const jsonData = await response.json();
          setSensorValues(jsonData);
          console.log(`Fetched sensor value for sensor ${sensorId}:`, jsonData);

        } catch (err) {
          console.error(err.message);
        }
      });

      // Wait for all sensor value requests to complete before setting loading to false
      await Promise.all(sensorValuePromises);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSensorParams();
  }, [deviceId]);

  // const combinedData = sensorParams.map((param) => {
  //   const matchingValue = sensorValues.find((value) => value.sensor_id === param.sensor_id);
  //   return {
  //     ...param,
  //     value: matchingValue ? matchingValue.value : null,
  //   };
  // });

  const sensorValueMap = sensorValues.reduce((map, item) => {
    map[item.sensor_id] = item;
    return map;
  }, {});
  
  // Merge jsonObject1 and jsonObject2 based on sensor_id
  const combinedData = sensorParams.map((item) => ({
    ...item,
    ...(sensorValueMap[item.sensor_id] || {}) // Use {} to provide default empty object
  }));
  
  console.log(combinedData)

  return (
    <div>
      {!loading ? (
        <>
          <p>Loaded</p>
          {combinedData.map((dataItem) => (
            <div className='chart' key={dataItem.sensor_id}>
              <GaugeChart
                id="sensor-gauge"
                nrOfLevels={10}
                colors={["#FF5F6D", "#FFC371"]}
                textColor="#000000" 
                arcWidth={0.34}
                // percent={dataItem.length > 0 ? parseFloat(dataItem.value) / 100 : 0}
                percent={parseFloat(dataItem.value) / 100 }
                key={dataItem.sensor_id}
                animate
              />
              <center key={dataItem.device_id}>
                {dataItem.key} : {dataItem.value !== null ? dataItem.value : 'Loading...'} {dataItem.siunit}
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
