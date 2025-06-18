import {
  Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Snackbar, Alert,  
} from '@mui/material';
import { useState, useContext } from 'react';
import { loginUser } from '@api/auth';
import { AuthProvider } from "@api/authContext";
import { AuthContext } from '@api/authContext'; // Ensure this path is correct

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email.');
      return false;
    }
    if (!form.password) {
      setError('Password is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await loginUser(form);
      console.log(response);
      if (response.status === 200) {
        login(response.data.token);
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h4" color="white" gutterBottom>
        Good Day !
      </Typography>
      <Typography variant="" color="white" mb={3}>
        Thank you for coming back!
      </Typography>

      <TextField
        fullWidth
        label="Your Email"
        name="email"
        variant="filled"
        type="email"
        value={form.email}
        onChange={handleChange}
        sx={{
          backgroundColor: '#444',
          input: { color: 'white' },
          label: { color: 'white' },
          '&:focus-within': { borderLeft: '2px solid #F4C430' },
          '& label.Mui-focused': { color: 'white' },
        }}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        variant="filled"
        type="password"
        value={form.password}
        onChange={handleChange}
        sx={{
          backgroundColor: '#444',
          input: { color: 'white' },
          label: { color: 'white' },
          '&:focus-within': { borderLeft: '2px solid #F4C430' },
          '& label.Mui-focused': { color: 'white' },
        }}
        margin="normal"
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <FormControlLabel
          control={<Checkbox sx={{ color: 'white' }} />}
          label={<Typography color="white">Remember me</Typography>}
        />
        <Link href="#" underline="hover" color="white" sx={{display:{xs:'none', md:'block'}}}>
          Forgot Password?
        </Link>
      </Box>

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
        Login
      </Button>
      <Box display="flex" sx={{display:{xs:'flex', md:'none'}}} justifyContent="center" alignItems="center" my={2}>        
        <Link href="#" underline="hover" color="white">
          Forgot Password?
        </Link>
      </Box>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Login Successful!</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
