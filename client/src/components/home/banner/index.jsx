import "./styles.scss";
import { Box, Button, Typography, CardMedia } from "@mui/material";
import banner_image from "../../../assets/homepage/home_Banner.png";

const labels = ["BUYING", "SELLING", "REMORTGAGE"];

const Banner = () => {
  return (
    <Box
      className="home-container"
      sx={{
        py: { xs: 2, md: 4 },
        px: { xs: 2, md: 13 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: 500 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 1,
            mb: 2,
          }}
        >
          {labels.map((label) => (
            <Button key={label} variant="contained" color="primary" sx={{ fontSize: 10 }}>
              {label}
            </Button>
          ))}
        </Box>

        <Typography
          variant="h4"
          fontWeight="900"
          mb={2}
          sx={{
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
            lineHeight: 1.2,
            color: "#000000",
          }}
        >
          By your side when
          <br />
          you need legal
          <br />
          solutions.
        </Typography>

        <Button variant="contained" color="secondary" size="large">
          Learn More
        </Button>
      </Box>

      {/* Right Image Section */}
      <Box
        sx={{
          maxWidth: { xs: 300, sm: 400, md: 500 },
          maxHeight: { xs: 300, sm: 400, md: 500 },
          borderRadius: "50%",
          overflow: "hidden",
          mt: { xs: 4, md: 0 },
        }}
      >
        <CardMedia
          component="img"
          src={banner_image}
          alt="Legal Solutions"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default Banner;
