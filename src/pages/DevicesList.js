import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

// Components
import SensorPopup from './SensorPop';

export default function DevicesList() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const fetchDevicesList = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/get-devices", {
        method: "GET",
        headers: { user_id: 5 }
      });
      const jsonData = await response.json();
      setDevices(jsonData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <h1>Loading...</h1>
        ) : devices.length > 0 ? (
          <ul className="">
            {devices.map((sv) => (
              <button
                key={sv.device_id}
                onClick={() => openSensorPopup(sv.device_id)}
              >{sv.description}</button>
            ))}
          </ul>
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
