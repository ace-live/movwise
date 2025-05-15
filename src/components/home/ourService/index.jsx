import "./styles.scss";
import { Box, Typography, Button, Grid, Card, CardMedia } from "@mui/material";
import banner_image from "../../../assets/homepage/Divwhat-photo-block.png";

const services = [
  { label: "BUYING", image: banner_image },
  { label: "SELLING", image: banner_image },
  { label: "BUYING & SELLING", image: banner_image },
  { label: "REMORTGAGE", image: banner_image },
];

const ServicesSection = () => {
  const titleStyle = {
    fontWeight: "bold",
    whiteSpace: "pre-line",
    lineHeight: 1.5,
    fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" },
  };

  return (
    <Box className="our-services" px={{ xs: 2, sm: 4 }} pb={{ xs: 5, sm: 10 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8} px={{ xs: 2, sm: 9 }}>
          <Typography variant="subtitle2">Our Services</Typography>

          <Typography variant="h4" sx={{ ...titleStyle, mt: 2 }}>
            Get tailored quotes from up to five qualified{"\n"}conveyancing professionals.
          </Typography>

          <Typography variant="h4" sx={titleStyle}>
            Whether you’re buying, selling, or remortgaging,{"\n"}easily connect with trusted legal experts!
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          px={{ xs: 2, sm: 9 }}
          container
          justifyContent={{ xs: "flex-start", md: "flex-end" }}
          alignItems="center"
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: { xs: 2, md: 0 }, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Register
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3} justifyContent="center" className="card">
            {services.map(({ label, image }) => (
              <Grid item xs={12} sm={6} md={3} key={label}>
                <Card
                  sx={{
                    display: "flex",
                    height: 400,
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: 326,
                    mx: "auto",
                  }}
                >
                  <Box
                    sx={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      background: "linear-gradient(to bottom, #03A687, #4A7C59)",
                      color: "#fff",
                      fontWeight: "bold",
                      px: 1,
                      py: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      letterSpacing: 1,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  >
                    {label}
                  </Box>

                  <CardMedia component="img" image={image} alt={label} sx={{ width: "100%", objectFit: "cover" }} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServicesSection;
