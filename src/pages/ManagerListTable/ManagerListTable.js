import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/loading/Loading";


const columns = [
    { field: 'name', headerName: 'Manager Name', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'mobile', headerName: 'Mobile', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
];

const ManagerListTable = () => {
    const [managers, setManagers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()

    const navigateHandle = () => {
        navigate('../add-manager', { role: "manager" }, { replace: true });
    }

    const managersWithUniqueId = managers.map((manager, index) => ({
        id: manager.uid, // Use manager_id as the unique identifier
        ...manager,
    }));

    const filteredManagers = managersWithUniqueId.filter((manager) =>
        manager.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {

        const fetchManagerList = async () => {
            const uid = Cookies.get('uid')
            const role = "tenant"
            try {
                const response = await fetch("http://localhost:4001/api/get-tenant-user", {
                    method: "GET",
                    headers: { uid, role }
                });
                const jsonData = await response.json();
                if (!jsonData.error) {
                    setManagers(jsonData);
                }
                console.log(jsonData)
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchManagerList();
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
                Add Manager
            </Button>
            {loading ? (
                <Loader />
            ) : managers.length > 0 ? (
                <>
                    <h1>Managers</h1>
                    <TextField
                        label="Search by Description"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                        style={{ margin: "16px 0" }}
                    />
                    <center>
                        <div style={{ height: 400, width: '75%' }}>
                            <DataGrid
                                rows={filteredManagers}
                                columns={columns}
                                pageSize={10}
                                sx={{
                                    boxShadow: 2,
                                    border: 2,
                                    borderColor: 'primary.light',
                                    '& .MuiDataGrid-cell:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            />
                        </div>
                    </center>
                </>
            ) : (
                <h1>No Managers</h1>
            )}
        </>
    )
}

export default ManagerListTable