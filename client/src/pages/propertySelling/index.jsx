import { useState } from "react";
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
  Typography,
  StepConnector,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";
import Flow1Svg from "@src/assets/property-selling/Flow_Banner1 1.svg";
import Flow2Svg from "@src/assets/property-selling/Flow_Banner1 2.svg";
import PropertyDetails from "./propertyDetails";
import PersonalInformation from "./personalInformation";
import FinalStep from "./finalStep";

// Custom connector style
const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: "8px",
    border: "0",
    backgroundColor: "#E8EAF6",
    borderRadius: "30px",
    margin: "0 12px",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#00C853", // green when active
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#00C853", // green when completed
  },
}));

// Custom step icon container
const StepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor:
    ownerState.active || ownerState.completed ? "#2E7D64" : "#B0BEC5", // green vs gray
  zIndex: 1,
  color: "#fff",
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: 16,
}));

// Step icon renderer
function CustomStepIcon(props) {
  const { active, completed, icon } = props;

  return <StepIconRoot ownerState={{ active, completed }}>{icon}</StepIconRoot>;
}

const steps = ["Property details", "Personal Information", "Step 3"];

const PropertySellingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    address: "",
    price: "",
    bedrooms: "",
    propertyType: "",
    leasehold: "",
    sharedOwnership: "",
    mortgage: "",
    instructions: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    subscribe: false,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);

  return (
    <Fade in timeout={1000}>
      <Paper>
        <Box
          sx={{
            backgroundColor: "#f4f9f6",
            textAlign: "center",
            p: isMobile ? 2 : 4,
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={Flow1Svg}
            alt=""
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              maxWidth: isMobile ? "100px" : "227px",
              width: "100%",
              height: "100%",
            }}
          />
          <Box
            component="img"
            src={Flow2Svg}
            alt=""
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              maxWidth: isMobile ? "100px" : "227px",
              width: "100%",
              height: "100%",
            }}
          />

          <Typography variant="h1" sx={{ mb: 2 }}>
            PROPERTY SELLING
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              maxWidth: 800,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Selling your home? Compare quotes from trusted conveyancing
            solicitors and get expert legal support for a smooth property sale
            in your preferred{" "}
            <Box component="span" sx={{ color: "#4A7C59", fontWeight: "bold" }}>
              language
            </Box>
          </Typography>
        </Box>
        <Box sx={{ width: "100%", mt: 4 }}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<CustomConnector />}
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon} />
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          mt={4}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, maxWidth: 900, margin: "auto" }}
          sx={{ p: 4 }}
        >
          {activeStep === 0 && (
            <PropertyDetails
              formValues={formValues}
              handleChange={handleChange}
            />
          )}
          {activeStep === 1 && (
            <PersonalInformation
              formValues={formValues}
              handleChange={handleChange}
            />
          )}
          {activeStep === 2 && <FinalStep formValues={formValues} />}
          <Box mt={4} textAlign="center">
            <Button variant="contained" color="secondary" onClick={handleNext}>
              NEXT STEP
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default PropertySellingForm;
