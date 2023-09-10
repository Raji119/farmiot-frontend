import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import Loader from "../components/loading/Loading";

import "./DevicesListTable.css"

const columns = [
    { id: 1, field: 'device_id', headerName: 'Device ID', flex: 1 },
    { id: 2, field: 'logitude', headerName: 'Longitude', flex: 1 },
    { id: 3, field: 'latitude', headerName: 'Latitude', flex: 1 },
    { id: 4, field: 'description', headerName: 'Description', flex: 1 },
];

const DevicesListTable = () => {
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()

    const navigateHandle = () => {
        navigate('/add-device', { replace: true });
    }

    const devicesWithUniqueId = devices.map((device, index) => ({
        id: device.device_id, // Use device_id as the unique identifier
        ...device,
    }));

    const filteredDevices = devicesWithUniqueId.filter((device) =>
        device.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {

        const fetchDevicesList = async () => {
            const uid = Cookies.get('uid')
            try {
                const response = await fetch("http://localhost:4001/api/get-devices", {
                    method: "GET",
                    headers: { user_id: uid }
                });
                const jsonData = await response.json();
                if(!jsonData.error){
                    setDevices(jsonData);
                }
                console.log(jsonData)
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDevicesList();
    }, [])
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
                    <TextField
                        label="Search by Description"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                        style={{ margin: "16px 0" }}
                    />
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={filteredDevices} columns={columns} pageSize={10} />
                    </div>
                </>
            ) : (
                <h1>No devices</h1>
            )}
        </>
    )
}

export default DevicesListTable