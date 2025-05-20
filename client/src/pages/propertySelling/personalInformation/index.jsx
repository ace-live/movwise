import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import "./styles.scss";

const PersonalInformation = ({ formValues, handleChange }) => {
  return (
    <Box className="personal-information-form">
      <Typography
        variant="h6"
        textAlign="center"
        mb={2}
        fontWeight="bold"
        style={{ color: "#452765" }}
      >
        Personal Information
      </Typography>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1" fontWeight="medium">
          Full Name
        </Typography>
        <TextField
          fullWidth
          placeholder="Full Name"
          name="fullName"
          value={formValues.fullName}
          onChange={handleChange}
        />
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1" fontWeight="medium">
          Email
        </Typography>
        <TextField
          fullWidth
          placeholder="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1" fontWeight="medium">
          Phone Number
        </Typography>
        <TextField
          fullWidth
          placeholder="Phone Number"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
        />
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1" fontWeight="medium">
          Password
        </Typography>
        <TextField
          fullWidth
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          type="password"
        />
      </Box>
      <Box mb={2} className="input-container">
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
    </Box>
  );
};

export default PersonalInformation;
