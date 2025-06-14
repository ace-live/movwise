import {
  Box, Typography, TextField, Button, Snackbar, Alert,
} from '@mui/material';
import { useState, useContext } from 'react';
import { registerUser, loginUser } from '@api/auth';
import { AuthContext } from '@api/authContext';

const registrationform = () => {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const { login } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        status: 1,
        status_desc: 'Activated',
        is_buyer: 0,
        is_seller: 1,
        is_remortgage: 0,
        is_guest: 0,
      };

          // Step 1: Register user
      const registrationResponse = await registerUser(payload);
      console.log('Registration Response:', registrationResponse);
      // Step 2: Auto-login with registered credentials
      if (registrationResponse && registrationResponse.email) {
        const loginResponse = await loginUser({
        email: registrationResponse.email,
        password: form.password, // Use the password from the form
      });
      if (loginResponse.status === 200) {
        login(loginResponse.data.token);
        setSuccess(true);
      }  
      }
          
    } catch (err) {    
    if (err.error?.includes('Email already exists')) {
      setError('This email is already registered.');
    } else {
      setError(err.error || 'Registration failed. Please try again.');
    }
  }
  };

  return (
    <Box sx={{ mt: 4, width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" color="white" gutterBottom>
        Good Day !
      </Typography>
      <Typography variant="" color="white" mb={3}>
        Thank you for Joining us!
      </Typography>

      <TextField 
        fullWidth
        label="Full Name"
        type='text'
        variant="filled"
        onChange={handleChange}
        name="name"
        margin="normal"
        sx={{ backgroundColor: '#444', input: { color: 'white' }, label: { color: 'white' } ,'&:focus-within': {
      borderLeft: '2px solid #F4C430', // Background on hover
    }, 
    '& label.Mui-focused': {
      color: 'white', // Label color when focused
    },
  }}
      />

      <TextField 
        fullWidth
        label="Your Email"
        type="email"        
        variant="filled"
        onChange={handleChange}
        name="email"
        margin="normal"
        sx={{ backgroundColor: '#444', input: { color: 'white' }, label: { color: 'white' } ,'&:focus-within': {
      borderLeft: '2px solid #F4C430', // Background on hover
    }, 
    '& label.Mui-focused': {
      color: 'white', // Label color when focused
    },
  }}
      />

      <TextField 
        fullWidth
        label="Your Phone"
        type="phone"        
        variant="filled"
        onChange={handleChange}
        name="phone"
        margin="normal"
        sx={{ backgroundColor: '#444', input: { color: 'white' }, label: { color: 'white' } ,'&:focus-within': {
      borderLeft: '2px solid #F4C430', // Background on hover
    }, 
    '& label.Mui-focused': {
      color: 'white', // Label color when focused
    },
  }}
      />

      <TextField 
        fullWidth
        label="Password"
        type="password"        
        variant="filled"
        onChange={handleChange}
        name="password"
        margin="normal"
        sx={{ backgroundColor: '#444', input: { color: 'white' }, label: { color: 'white' } ,'&:focus-within': {
      borderLeft: '2px solid #F4C430', // Background on hover
    }, 
    '& label.Mui-focused': {
      color: 'white', // Label color when focused
    },
  }}
      />

      <TextField 
        fullWidth
        label="Confirm Password"
        type="password"        
        variant="filled"
        onChange={handleChange}
        name="confirmPassword"
        margin="normal"
        sx={{ backgroundColor: '#444', input: { color: 'white' }, label: { color: 'white' } ,'&:focus-within': {
      borderLeft: '2px solid #F4C430', // Background on hover
    }, 
    '& label.Mui-focused': {
      color: 'white', // Label color when focused
    },
  }}
      />      

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{          
          color: '#000',
          py: 2,
          fontWeight: 'bold',
          mt: 1,
          '&:hover': { color: 'white' },
        }}
      >
        Register
      </Button>

<Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Registration Successful!</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

    </Box>
  );
};

export default registrationform;
