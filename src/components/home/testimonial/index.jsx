import { Box, Typography, Button, Card, CardContent, Grid, Divider, Container } from "@mui/material";
import "./styles.scss";

const testimonials = [
  {
    text: `Elizabeth of move wise handled the complete process settlement of our home for us recently and it lorem was a real pleasure having her on our team ipsum. Elizabeth was wonderful to deal with, friendly and obliging. But overwhelmingly, she was very much competent and thorough and made it all seem so easy.`,
    author: "Kelly, Newcastle",
    date: "May 5, 2025",
  },
  {
    text: `Elizabeth of move wise handled the complete process settlement of our home for us recently and it lorem was a real pleasure having her on our team ipsum. Elizabeth was wonderful to deal with, friendly and obliging. But overwhelmingly, she was very much competent and thorough and made it all seem so easy.`,
    author: "Kelly, Newcastle",
    date: "April 12, 2025",
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ bgcolor: "#f7f7f7" }} py={12} px={13} className="testimonial-container">
      <Container className="top-section">
        <Box className="content" sx={{ mr: 6 }}>
          <Typography variant="subtitle2">Testimonials</Typography>

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
            We love what we do and so do our clients! But don't take our word for it – take theirs…
          </Typography>

          <Button variant="contained" color="secondary">
            Read More
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mt: 4 }} className="grid-container">
          {testimonials.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent sx={{ padding: "24px" }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      background: "linear-gradient(to bottom, #03A687, #4A7C59)",
                      borderRadius: "50%",
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {item.text}
                  </Typography>
                  <Typography variant="body2">{item.author}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" fontWeight="bold">
                    Review added on {item.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
