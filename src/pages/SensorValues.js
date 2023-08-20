import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function SensorValues() {
  const theme = useTheme();

  // const [sensorValue, setSensorValue] = useState([]);
  let sensorValue = [];
  const renderValue = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/get-sensor-value", {
        method: "POST",
        headers: {device_id: 1, uid: 5}
      });
      const jsonData = await response.json();
      // setSensorValue(jsonData[0]);
      sensorValue = jsonData;
      console.log(sensorValue[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    renderValue();
  }, []);

  return (
    <>
      <Helmet>
        <title> Sensor values </title>
      </Helmet>

     { sensorValue.length > 0 ? 
        <ul className="">
        {sensorValue[0].map((sv) => (
          <li
            key={sv.device_id}
            // onClick={() => (window.location = `/products/${cat.category}`)}
            // variant="outlined"
          >
            {sv.description}
          </li>
        ))}
      </ul> : <h1>No devices</h1>}


    </>
  );
}
