import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container"

function Page404() {
  return (
    <Container maxWidth="md">
      <Stack sx={{ alignItems: "center" }}>
      <img src="/404.png" alt="404 - Page Not Found" style={{ maxWidth: '100%', maxHeight: '100%', padding: "60px" }} /> 
      </Stack>
      </Container>
  );
}

export default Page404;