import React, { useEffect, useState } from 'react';

// @mui
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SensorValuePopup from './SensorValuePopup'; // Import the new component

const SensorPopup = ({ deviceId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [sensorParams, setSensorParams] = useState([]);
  const [selectedSensorId, setSelectedSensorId] = useState(null);
  const [sensor, setSensor] = useState();

  const handleChange = (event) => {
    setSensor(event.target.value);
    handleSensorClick(event.target.value)
  };

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
          <>
            <h3>Sensors</h3>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={sensor}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {sensorParams.map((sv) => (
                  <MenuItem
                    value={sv.sensor_id}
                  >{sv.key}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Select devices</FormHelperText>
            </FormControl>
              </>
        ) : (
          <h3>No Sensors</h3>
        )}
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
