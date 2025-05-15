import { Box, Typography, Grid, Button, Card, CardContent } from "@mui/material";
import background_image from "../../../assets/homepage/ourAdvantage-background.jpg";
import "./styles.scss";

const OurAdvantage = () => {
  return (
    <Box className="ourAdvantage-container">
      {/* Top Section with Background */}
      <Box
        sx={{
          px: { xs: 3, sm: 6, md: 13, lg: 13 },
          py: { xs: 4, sm: 6, md: 13 },
          backgroundImage: `url(${background_image})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
        className="top-section"
      >
        <Grid container spacing={8} direction={{ xs: "column", md: "row" }} alignItems="flex-start">
          {/* Left Text Content */}
          <Grid item xs={12} md={6}>
            <Box
              className="content"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                height: "100%",
              }}
            >
              <Typography variant="subtitle2">Our Advantages</Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mt: 2,
                  mb: { xs: 2, sm: 3 },
                  whiteSpace: "pre-line",
                  lineHeight: 1.5,
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" },
                }}
              >
                Why you should trust {"\n"}
                Porter Veritas {"\n"}
                Conveyancing when {"\n"}
                buying or selling your {"\n"} home?
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Contact
              </Button>
            </Box>
          </Grid>

          {/* Right Card Section */}
          <Grid item xs={12} md={6} className="grid-container">
            <Grid container spacing={4}>
              {[
                "Over 20 years’ experience in the legal and real estate industry with 11 of those years practising as a licensed conveyancer.",
                "Elizabeth understands every matter is a unique and emotional decision, which is much more than just a property transaction.",
              ].map((text, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ p: { xs: 2, sm: 3 }, height: "100%", width: "386px" }}>
                    <CardContent>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          background: "linear-gradient(to bottom, #03A687, #4A7C59)",
                          borderRadius: "50%",
                          mb: 2,
                        }}
                      />
                      <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                        {text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #03A687, #4A7C59)",
          color: "#fff",
          p: { xs: 4, sm: 6, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: { xs: 3, md: 0 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Here to take your <br /> call and questions.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            mt: { xs: 2, md: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          PH: 0426 200 249
        </Button>
      </Box>
    </Box>
  );
};

export default OurAdvantage;
