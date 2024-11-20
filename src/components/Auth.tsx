import { Box, Button, TextField, Paper } from "@mui/material";
import { Formik } from "formik";
import { validatePost } from "../api/usages";
import { useDispatch } from "react-redux";
import { showNotification } from "../slices/Notification/notificationSlice";
import { AxiosError } from "axios";

const Auth = () => {
    const dispatch = useDispatch();
    const handleSubmit = async (values: { authCode: string }) => {
        try {
            const status = await validatePost({ code: values.authCode });
            if (status === 200) {
                localStorage.setItem("token", values.authCode);
                window.location.href = "/sec";
                dispatch(
                    showNotification({
                        message: "Successfully authenticated!",
                        severity: "success",
                        persistent: true, // Уведомление будет постоянным
                    }),
                );
            } else if (status === 404) {
                dispatch(
                    showNotification({
                        message: "Invalid code",
                        severity: "error",
                        persistent: true, // Уведомление будет постоянным
                    }),
                );
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                dispatch(
                    showNotification({
                        message: "Error during authentication: " + error.message,
                        severity: "error",
                        persistent: true, // Уведомление будет постоянным
                    }),
                );
            } else {
                dispatch(
                    showNotification({
                        message: "An unknown error occurred.",
                        severity: "error",
                        persistent: true, // Уведомление будет постоянным
                    }),
                );
            }
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f4f4f4",
                width: "100vw",
            }}
        >
            <Paper
                sx={{
                    padding: 4,
                    width: 400,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h2>Welcome to "MOVE TO"!</h2>
                <Formik initialValues={{ authCode: "" }} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <>
                            <TextField
                                name="authCode"
                                value={values.authCode}
                                onChange={handleChange}
                                placeholder="Type your code by Vova"
                                fullWidth
                                sx={{ marginBottom: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(values);
                                }}
                                fullWidth
                            >
                                Log in
                            </Button>
                        </>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default Auth;
