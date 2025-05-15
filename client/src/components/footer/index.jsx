import { Box, Grid, Typography, Button, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#F1F7F4", px: { xs: 4, sm: 6, md: 10, lg: 13 }, py: { xs: 4, md: 6 } }}>
      <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
        {/* Logo & Description (Left side) */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Box
              component="img"
              src="your-logo-url.png"
              alt="Movewise Logo"
              sx={{ height: 80, width: "auto", maxWidth: "100%" }}
            />
            <Typography
              variant="body1"
              sx={{
                maxWidth: "400px",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              Licensed for all Conveyancing matters within New South Wales, with focus on Newcastle, Hunter Valley, Lake
              Macquarie, Central Coast and Sydney.
            </Typography>
            <Box>
              <Button variant="contained" color="secondary">
                Learn More
              </Button>
            </Box>
          </Stack>
        </Grid>

        {/* Remaining Sections (Right side) */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={6}>
            {/* Left column: Nav and Services */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Nav
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover" color="inherit">
                  About
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Resources
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Contact
                </Link>
              </Stack>

              <Typography variant="h6" color="text.primary" gutterBottom sx={{ mt: 2 }}>
                Services
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover" color="inherit">
                  Buying
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Selling
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Advice / Blog
                </Link>
              </Stack>
            </Grid>

            {/* Right column: Contact and Social */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.primary">
                Contact
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2">ABC 123 Find us here</Typography>
                <Typography variant="body2">ABCDE NSW 2289</Typography>
                <Typography variant="body2">PO ABC 7041</Typography>
                <Typography variant="body2">LOREM IPSUM 4290</Typography>
              </Stack>

              <Typography variant="h6" color="text.primary" gutterBottom sx={{ mt: 2 }}></Typography>
              <Stack spacing={1}>
                <Typography variant="body2">loramipsum@movewise.uk</Typography>
                <Typography variant="body2">978 987 123</Typography>

                <Link href="#" underline="hover" color="inherit">
                  Facebook
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Instagram
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  LinkedIn
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
