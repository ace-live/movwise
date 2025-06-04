import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import './styles.scss';

const AuthTabs = ({ onTabChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box sx={{  borderColor: 'divider' ,display: {}}} >
      <Tabs className="menu-items" value={value} onChange={handleChange} textColor="inherit" indicatorColor="secondary" variant="text">
        <Tab label="Login" variant="text" />
        <Tab label="Registration" variant="text" />
      </Tabs>
    </Box>
  );
};

export default AuthTabs;
