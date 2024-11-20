import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
const Layout = () => {
    const navigate = useNavigate();
    return (_jsxs(Box, { sx: {
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
        }, children: [_jsx(Box, { sx: {
                    height: "64px",
                    width: "100%",
                    backgroundColor: "primary.main",
                }, children: _jsx(AppBar, { position: "static", children: _jsxs(Toolbar, { sx: { justifyContent: "space-between" }, children: [_jsx(Typography, { variant: "h6", sx: { userSelect: "none", fontWeight: "bold" }, children: "MOVE TO" }), _jsx(Button, { variant: "contained", sx: {
                                    backgroundColor: "white",
                                    color: "primary.main",
                                    fontWeight: "bold",
                                }, onClick: () => {
                                    localStorage.removeItem("token");
                                    navigate("/sec/auth");
                                }, children: "Logout" })] }) }) }), _jsxs(Box, { sx: {
                    display: "flex",
                    height: "calc(100vh - 64px)",
                    width: "100%",
                }, children: [_jsx(Box, { sx: {
                            width: "250px",
                            overflowY: "auto",
                            backgroundColor: "white",
                            borderRight: "1px solid",
                            borderColor: "primary.main",
                        }, children: _jsx(Box, { onClick: () => {
                                navigate("/sec/move_to");
                            }, sx: {
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
                            }, children: "https://poleros.site/C1ZzMq" }) }), _jsx(Box, { sx: {
                            flex: 1,
                            overflowY: "auto",
                            backgroundColor: "white",
                        }, children: _jsx(Outlet, {}) })] })] }));
};
export default Layout;
