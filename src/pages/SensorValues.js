import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import Iconify from '../components/iconify';

export default function SensorValues() {
  const [sensorValue, setSensorValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSensorValue = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/get-sensor-value", {
        method: "POST",
        headers: {device_id: 1, uid: 5}
      });
      const jsonData = await response.json();
      setSensorValue(jsonData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorValue();
  }, []);

  const RenderSensor = () => {
    return (
      <>
        <Helmet>
          <title> Sensor values </title>
        </Helmet>
        
        {loading ? (
          <h1>Loading...</h1>
        ) : sensorValue.length > 0 ? (
          <ul className="">
            {sensorValue.map((sv) => (
              <button key={sv.device_id}
                // onClick={}
              >{ sv.description }</button>
            ))}
          </ul>
        ) : (
          <h1>No devices</h1>
        )}
      </>
    );
  };

  

  return (
    <>
      <RenderSensor />
    </>
  );
}
