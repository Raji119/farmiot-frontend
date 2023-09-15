// import React from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {  Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Cookies from 'js-cookie';


const AddUser = (role) => {
    const navigate = useNavigate();
    console.log(role)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleMobileChange = (event) => {
        setMobile(event.target.value);
    }

    const handleAddDeviceSubmit = async() => {
        const adminid = Cookies.get('uid')
        try {
            const response = await fetch('http://localhost:4001/api/add-tenant-user', {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({ name, email, password, address, mobile, adminid, role })
            })

            if(response.status !== 200){
                alert("There was a problem")
            }
            else{
                navigate('../')
            }      
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="add-device-container">
            <Stack spacing={3}>
                <TextField name="name" label="User Name" value={name} onChange={handleNameChange} required/>
                <TextField name="email" label="Email" value={email} onChange={handleEmailChange} required/>
                <TextField name="password" label="Password" value={password} onChange={handlePasswordChange} required/>
                <TextField name="address" label="Address" value={address} onChange={handleAddressChange} required/>
                <TextField name="mobile" label="Mobile" value={mobile} onChange={handleMobileChange} required/>
            </Stack>


      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleAddDeviceSubmit} style={{ marginTop: '16px' }}>
        ADD USER
      </LoadingButton>
        </div>
    )
}

export default AddUser;