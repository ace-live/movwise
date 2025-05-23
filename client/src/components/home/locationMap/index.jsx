import { Box, Typography } from "@mui/material";
import "./styles.scss";
import banner_image from "@src/assets/homepage/map.png";

const LocationMap = () => {
  return (
    <div className="location-container">
      {/* Contact Info */}
      <Box
        className="location-content"
        sx={{
          bgcolor: "#fff",
          textAlign: "center",
          width: "100%",
          maxWidth: "620px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
        }}
        py={4}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            background: "linear-gradient(to bottom, #03A687, #4A7C59)",
            borderRadius: "50%",
            mx: "auto",
            mb: 2,
          }}
        />
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem" },
          }}
        >
          Where to find us
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          ABC LOREM IPSUM FIND US
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          HERE IN UK 2289
        </Typography>
      </Box>

      {/* Map Image */}
      <Box
        sx={{
          width: "100%",
          background: "#E5E3DF",
          boxShadow: "0px 8px 40px -7px rgba(46, 50, 60, 0.09)",
        }}
      >
        <img className="location-image" src={banner_image} alt="Banner" />
      </Box>
    </div>
  );
};

export default LocationMap;
