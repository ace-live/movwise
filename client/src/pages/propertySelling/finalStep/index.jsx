import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FinalStep = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" mb={2}>
        Thank You Mercy dove
      </Typography>
      <Typography mt={3}>
        Please click on the link we’ve sent to your email mercydove@gmail.com
      </Typography>
      <Typography mt={1}>
        Wrong email?{" "}
        <span style={{ color: "green", cursor: "pointer" }}>
          Change and resend Quotes
        </span>
      </Typography>
      <Typography mt={3}>
        Can’t see quotes in your email? Check your spam folder
      </Typography>

      <Typography variant="h6" mt={8} mb={2}>
        FREQUENTLY ASKED QUESTIONS
      </Typography>

      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          How do our service different from market?
        </AccordionSummary>
        <AccordionDetails>
          We offer expert legal support tailored to your needs.
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          What are the further steps?
        </AccordionSummary>
        <AccordionDetails>
          You'll receive quotes and can select the best one.
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          How can I raise complaint?
        </AccordionSummary>
        <AccordionDetails>
          Contact our support through the email provided in your confirmation.
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          How do I contact movwise team?
        </AccordionSummary>
        <AccordionDetails>
          Reach out via the contact form or support email.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Property guide
        </AccordionSummary>
        <AccordionDetails>
          We provide step-by-step guidance for selling your property.
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FinalStep;
