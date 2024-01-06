// import React from "react";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Cookies from 'js-cookie';
// components
import Iconify from '../../components/iconify/Iconify';

const AddDevice = () => {
  const navigate = useNavigate();

  const [macID, setMacID] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [description, setDescription] = useState('');

  const handleMacChange = (event) => {
    setMacID(event.target.value);
  };
  const handleLogitudeChange = (event) => {
    setLongitude(event.target.value);
  };
  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddDeviceSubmit = async () => {
    const uid = Cookies.get('uid');
    try {
      const response = await fetch(`${config.apiUrl}/api/add-device`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: macID, lat: latitude, longi: longitude, descr: description, uid }),
      });

      if (response.status !== 200) {
        alert('There was a problem');
      } else {
        navigate('/dashboard/sensor-values');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="add-device-container">
      <Stack spacing={3}>
        <TextField name="email" label="Device MAC Id" value={macID} onChange={handleMacChange} required />
        <TextField name="email" label="logitude" value={longitude} onChange={handleLogitudeChange} required />
        <TextField name="email" label="latitude" value={latitude} onChange={handleLatitudeChange} required />
        <TextField name="email" label="description" value={description} onChange={handleDescriptionChange} required />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleAddDeviceSubmit}
        style={{ marginTop: '16px' }}
      >
        ADD DEVICE
      </LoadingButton>
    </div>
  );
};

export default AddDevice;
