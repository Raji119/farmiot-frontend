import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Cookies from 'js-cookie';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async() => {
    try {
      const response = await fetch('http://localhost:4001/api/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      })

      if(response.status === 200){
        const jsonData = await response.json();
        if(jsonData.token){
          Cookies.set('token', jsonData.token, {expires: 2})
          Cookies.set('uid', jsonData.uid, {expires: 2})
          // setCookie();
          navigate('/dashboard', { replace: true });
        } 
      } else {
        alert("Wrong email or password")
      }
      
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onWebLoad =async() => {
    const token = Cookies.get('token');
    console.log(token)
    if (token) {
      const response = await fetch('http://localhost:4001/api/authenticate', {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token },
      })

      console.log(response);

      if (response.status === 200) {
        navigate('/dashboard/app', { replace: true });
      }
    }
  } 

  useEffect(()=>{
    onWebLoad();
  },[])

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
