import { Box, Typography, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import googleIcon from '@assets/login/google-icon.png';
import facebookIcon from '@assets/login/facebook-icon.png';

const SocialSignIn = ({label}) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Divider sx={{ my: 2, '&:before,&:after': {
        borderTop: 'thin solid white',}, }}>OR</Divider>

      <Typography variant="h6" color="white" gutterBottom>
        {label}
      </Typography>

      <Box display="flex" justifyContent="center" gap={4} mt={2}>
        <img src={googleIcon} alt="Google" style={{ width: 40, cursor: 'pointer' }} />
        <img src={facebookIcon} alt="Facebook" style={{ width: 40, cursor: 'pointer', color: '#4267B2' }} />
        {/* <GoogleIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
        <FacebookIcon sx={{ fontSize: 40, color: '#4267B2', cursor: 'pointer' }} /> */}
      </Box>
    </Box>
  );
};

export default SocialSignIn;
