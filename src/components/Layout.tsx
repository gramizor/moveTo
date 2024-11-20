import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "64px",
          width: "100%",
          backgroundColor: "primary.main",
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{userSelect: "none", fontWeight: "bold"}}>MOVE TO</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                fontWeight: "bold",
              }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/sec/auth");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 64px)",
          width: "100%",
        }}
      >

        <Box
          sx={{
            width: "250px",
            overflowY: "auto",
            backgroundColor: "white",
            borderRight: "1px solid",
            borderColor: "primary.main",
          }}
        >

          <Box
            onClick={() => {
              navigate("/sec/move_to");
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "64px",
              cursor: "pointer",
              color: "primary.main",
                margin: '12px',
              boxShadow: "0 0 4px 2px currentColor",
              borderRadius: "4px",
              ...(location.pathname === "/sec/move_to" && {
                backgroundColor: "primary.main",
                color: "white",
              }),
              "&:hover": {
                boxShadow: "0 0 6px 3px currentColor",
              },
            }}
          >
            https://poleros.site/C1ZzMq
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "white",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
