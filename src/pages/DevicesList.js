import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Cookies from 'js-cookie';

// Components
import Loader from '../components/loading/Loading';
import SensorPopup from './SensorPop';

export default function DevicesList() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [device, setDevice] = useState();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setDevice(event.target.value);
    openSensorPopup(event.target.value)
  };

  const fetchDevicesList = async () => {
    const uid = Cookies.get('uid')
    try {
      const response = await fetch("http://localhost:4001/api/get-devices", {
        method: "GET",
        headers: { user_id: uid }
      });
      const jsonData = await response.json();
      setDevices(jsonData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateHandle = () => {
    navigate('/add-device', { replace: true });
  }

  useEffect(() => {
    fetchDevicesList();
  }, []);

  const openSensorPopup = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const closeSensorPopup = () => {
    setSelectedDevice(null);
  };

  const RenderDevicesList = () => {
    return (
      <>
        <Helmet>
          <title> Sensor values </title>
        </Helmet>

        <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={navigateHandle}    
        >
          Add device
        </Button>

        {loading ? (
          <Loader />
        ) : devices.length > 0 ? (
          <>
            <h1>Devices</h1>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={device}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {devices.map((sv) => (
                  <MenuItem
                    value={sv.device_id}
                  >{sv.description}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Select devices</FormHelperText>
            </FormControl>
          </>
        ) : (
          <h1>No devices</h1>
        )}

        {selectedDevice && (
          <SensorPopup deviceId={selectedDevice} onClose={closeSensorPopup} />
        )}
      </>
    );
  };



  return (
    <>
      <RenderDevicesList />
    </>
  );
}
