import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, TextField, Paper } from "@mui/material";
import { Formik } from "formik";
import { validatePost } from "../api/usages";
import { useDispatch } from "react-redux";
import { showNotification } from "../slices/Notification/notificationSlice";
import { AxiosError } from "axios";
const Auth = () => {
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            const status = await validatePost({ code: values.authCode });
            if (status === 200) {
                localStorage.setItem("token", values.authCode);
                window.location.href = "/sec";
                dispatch(showNotification({
                    message: "Successfully authenticated!",
                    severity: "success",
                    persistent: true, // Уведомление будет постоянным
                }));
            }
            else if (status === 404) {
                dispatch(showNotification({
                    message: "Invalid code",
                    severity: "error",
                    persistent: true, // Уведомление будет постоянным
                }));
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                dispatch(showNotification({
                    message: "Error during authentication: " + error.message,
                    severity: "error",
                    persistent: true, // Уведомление будет постоянным
                }));
            }
            else {
                dispatch(showNotification({
                    message: "An unknown error occurred.",
                    severity: "error",
                    persistent: true, // Уведомление будет постоянным
                }));
            }
        }
    };
    return (_jsx(Box, { sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f4f4f4",
            width: "100vw",
        }, children: _jsxs(Paper, { sx: {
                padding: 4,
                width: 400,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }, children: [_jsx("h2", { children: "Welcome to \"MOVE TO\"!" }), _jsx(Formik, { initialValues: { authCode: "" }, onSubmit: handleSubmit, children: ({ values, handleChange }) => (_jsxs(_Fragment, { children: [_jsx(TextField, { name: "authCode", value: values.authCode, onChange: handleChange, placeholder: "Type your code by Vova", fullWidth: true, sx: { marginBottom: 2 } }), _jsx(Button, { variant: "contained", onClick: (e) => {
                                    e.preventDefault();
                                    handleSubmit(values);
                                }, fullWidth: true, children: "Log in" })] })) })] }) }));
};
export default Auth;
