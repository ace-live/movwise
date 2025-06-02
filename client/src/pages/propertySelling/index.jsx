import { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import Flow1Svg from '@src/assets/property-selling/Flow_Banner1 1.svg';
import Flow2Svg from '@src/assets/property-selling/Flow_Banner1 2.svg';
import PropertyDetails from './propertyDetails';
import PersonalInformation from "./personalInformation"
import FinalStep from './finalStep';

const steps = ['Property details', 'Personal Information', 'Step 3'];

const PropertySellingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    address: '', price: '', bedrooms: '', propertyType: '', leasehold: '', sharedOwnership: '',
    mortgage: '', instructions: '', fullName: '', email: '', phone: '', password: '', subscribe: false,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);

  return (
    <Fade in timeout={1000}>
      <Paper>
        <Box sx={{ backgroundColor: '#f4f9f6', textAlign: 'center', p: isMobile ? 2 : 4, position: 'relative' }}>
          <Box component="img" src={Flow1Svg} alt="" sx={{ position: 'absolute', top: 0, left: 0, maxWidth: isMobile ? '100px' : '227px',width: "100%",
    height: "100%", }} />
          <Box component="img" src={Flow2Svg} alt="" sx={{ position: 'absolute', top: 0, right: 0, maxWidth: isMobile ? '100px' : '227px' ,width: "100%",
    height: "100%",}} />

          <Typography variant="h1" sx={{ mb: 2 }}>PROPERTY SELLING</Typography>
          <Typography variant="h2" sx={{ fontWeight: 600, maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            Selling your home? Compare quotes from trusted conveyancing solicitors and get expert legal support for a smooth property sale in your preferred <Box component="span" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>language</Box>
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel  sx={{ margin: 'auto', maxWidth: 900 }}>
          {steps.map((label, i) => <Step key={label}><StepLabel>{i + 1}</StepLabel></Step>)}
        </Stepper>

        <Box mt={4} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {activeStep === 0 && <PropertyDetails formValues={formValues} handleChange={handleChange} />}
            {activeStep === 1 && <PersonalInformation formValues={formValues} handleChange={handleChange} />}
            {activeStep === 2 && <FinalStep formValues={formValues} />}
          <Box mt={3} textAlign="center">
            <Button variant="contained" color="warning" onClick={handleNext}>NEXT STEP</Button>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default PropertySellingForm;
