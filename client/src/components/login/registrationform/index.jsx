import {
  Box, Typography, TextField, Button, Snackbar, Alert,
} from '@mui/material';
import { useState } from 'react';
import { registerUser } from '@api/auth';

const registrationform = () => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

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
        status: 'active',
        status_desc: 'New User',
        is_buyer: true,
        is_seller: false,
        is_remortgage: false,
        is_guest: false,
      };

      await registerUser(payload);
      setSuccess(true);
    } catch (err) {
      setError(err.error || 'Something went wrong!');
    }
  };

  return (
    <Box sx={{ mt: 4, width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" color="white" gutterBottom>
        Good Day !
      </Typography>
      <Typography variant="subtitle1" color="white" mb={3}>
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
