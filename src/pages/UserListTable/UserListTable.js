import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Loader from '../../components/loading/Loading';

import './UserListTable.css';

const columns = [
  { field: 'name', headerName: 'User Name', flex: 1 },
  { field: 'address', headerName: 'Address', flex: 1 },
  { field: 'mobile', headerName: 'Mobile', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
];

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const navigateHandle = () => {
    navigate('../add-user', { replace: true });
  };

  const usersWithUniqueId = users.map((user, index) => ({
    id: user.uid, // Use user_id as the unique identifier
    ...user,
  }));

  const userManagers = usersWithUniqueId.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const fetchManagerList = async () => {
      const uid = Cookies.get('uid');
      const role = 'user';
      try {
        const response = await fetch(`${config.apiUrl}/api/get-tenant-user`, {
          method: 'GET',
          headers: { uid, role },
        });
        const jsonData = await response.json();
        if (!jsonData.error) {
          setUsers(jsonData);
        }
        console.log(jsonData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManagerList();
  }, []);

  const evenOddDark = (params) => {
    // Use the index of the row to determine odd or even
    return params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
  };

  const handleRowClick = (rowData) => {
    console.log('Clicked row: ', rowData.id);
  };

  return (
    <>
      <Helmet>
        <title> Sensor values </title>
      </Helmet>
      <Button variant="contained" startIcon={<AddIcon />} onClick={navigateHandle}>
        Add User
      </Button>
      {loading ? (
        <Loader />
      ) : users.length > 0 ? (
        <>
          <h1>Users</h1>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            style={{ margin: '16px 0' }}
          />
          <center>
            <div style={{ height: 400, width: '75%' }}>
              <DataGrid
                rows={userManagers}
                columns={columns}
                pageSize={10}
                getRowClassName={evenOddDark}
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'primary.light',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                  },
                }}
                onRowClick={(params) => {
                  handleRowClick(params.row);
                }}
              />
            </div>
          </center>
        </>
      ) : (
        <h1>No Users</h1>
      )}
    </>
  );
};

export default UserListTable;
