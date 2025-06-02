import React from 'react';
import { Box, TextField, MenuItem, Typography,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,InputLabel,Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const PropertyDetails = ({ formValues, handleChange }) => {
  return (
    <Box>
        
    
              <Typography variant="h6" gutterBottom>
                Property details
              </Typography>

              <TextField
                label="Property address"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{ endAdornment: <SearchIcon /> }}
              />

              <TextField
                label="Agreed sale price"
                name="price"
                type="number"
                value={formValues.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{ startAdornment: <span style={{ marginRight: 8 }}>£</span> }}
              />

              <FormControl fullWidth margin="normal">
                <FormLabel>Number of Bedrooms</FormLabel>
                <RadioGroup
                  row
                  name="bedrooms"
                  value={formValues.bedrooms}
                  onChange={handleChange}
                >
                  {['1 bed', '2 bed', '3 bed', '4 bed', '5+ bed'].map((label) => (
                    <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Property type</InputLabel>
                <Select
                  name="propertyType"
                  value={formValues.propertyType}
                  onChange={handleChange}
                >
                  <MenuItem value="Flat">Flat</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Bungalow">Bungalow</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Leasehold or Freehold?</InputLabel>
                <Select
                  name="leasehold"
                  value={formValues.leasehold}
                  onChange={handleChange}
                >
                  <MenuItem value="Leasehold">Leasehold</MenuItem>
                  <MenuItem value="Freehold">Freehold</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="h6" mt={4} gutterBottom>
                Property Finance
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel>Shared Ownership</InputLabel>
                <Select
                  name="sharedOwnership"
                  value={formValues.sharedOwnership}
                  onChange={handleChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Existing mortgage to redeem?</FormLabel>
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

              <TextField
                label="Special instructions"
                name="instructions"
                multiline
                rows={3}
                value={formValues.instructions}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
    </Box>
  );
};

export default PropertyDetails;
