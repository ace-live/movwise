import { useState } from "react";
import PropTypes from "prop-types";
import { Fade, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function MDAlert({ color, dismissible, children, onClose, ...rest }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <Fade in={isVisible} timeout={300}>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        mb={2}
        borderRadius="lg"
        bgColor={`${color}`}
        variant="gradient"
        {...rest}
      >
        <MDTypography variant="body2" color="white">
          {children}
        </MDTypography>
        {dismissible && (
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ color: "white", ml: 2 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </MDBox>
    </Fade>
  );
}

// Default props
MDAlert.defaultProps = {
  color: "info",
  dismissible: false,
  onClose: null,
};

// Typechecking props
MDAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

export default MDAlert;