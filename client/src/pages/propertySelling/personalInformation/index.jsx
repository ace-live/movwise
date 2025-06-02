import React from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';

const PersonalInformation = ({ formValues, handleChange }) => {
  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight="bold">Personal Information</Typography>

      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={formValues.fullName}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone Number"
        name="phone"
        value={formValues.phone}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        margin="normal"
        type="password"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formValues.subscribe}
            onChange={handleChange}
            name="subscribe"
          />
        }
        label="Yes, I'd like the moving house checklist emails and tips to make moving easier."
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default PersonalInformation;
