import {
  Box,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.scss";

const PropertyDetails = ({ formValues, handleChange }) => {
  return (
    <Box className="property-details-form">
      <Box textAlign="center" mt={2} mb={2} style={{ color: "#452765" }}>
        <Typography variant="h6" gutterBottom>
          Property Details
        </Typography>
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">Property Address :</Typography>
        <TextField
          placeholder="Enter property address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">Agreed Sale Price :</Typography>
        <TextField
          placeholder="Enter price"
          name="price"
          type="number"
          value={formValues.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <span style={{ marginRight: 8 }}>£</span>,
          }}
        />
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">Number of Bedrooms :</Typography>
        <FormControl fullWidth>
          <RadioGroup
            row
            name="bedrooms"
            value={formValues.bedrooms}
            onChange={handleChange}
          >
            {["1 bed", "2 bed", "3 bed", "4 bed", "5+ bed"].map((label) => (
              <FormControlLabel
                key={label}
                value={label}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">Property Type :</Typography>
        <FormControl fullWidth variant="outlined" margin="dense">
          <Select
            name="propertyType"
            value={formValues.propertyType}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">Select Property Type</MenuItem>
            <MenuItem value="Flat">Flat</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Bungalow">Bungalow</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">Leasehold or Freehold? :</Typography>
        <FormControl fullWidth variant="outlined" margin="dense">
           <Select
            name="leasehold"
            value={formValues.leasehold}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">Select Leasehold or Freehold :</MenuItem>
            <MenuItem value="Leasehold">Leasehold</MenuItem>
            <MenuItem value="Freehold">Freehold</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box textAlign="center" mt={4} mb={2} style={{ color: "#452765" }}>
        <Typography variant="h6" gutterBottom>
          Property Finance
        </Typography>
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">Shared Ownership :</Typography>
        <FormControl fullWidth variant="outlined" margin="dense">
          <Select
            name="sharedOwnership"
            value={formValues.sharedOwnership}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">Select Shared Ownership :</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">
          Existing mortgage to redeem? :
        </Typography>
        <FormControl fullWidth>
          <RadioGroup
            row
            name="mortgage"
            value={formValues.mortgage}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mb={2} className="input-container">
        <Typography variant="subtitle1">Special Instructions :</Typography>
        <TextField
          placeholder="List any special instruction to be handled"
          name="instructions"
          multiline
          rows={3}
          value={formValues.instructions}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default PropertyDetails;
