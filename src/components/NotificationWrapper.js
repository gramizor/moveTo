import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Snackbar, SnackbarContent } from "@mui/material";
import { clearNotification } from "../slices/Notification/notificationSlice";
const NotificationWrapper = () => {
    const dispatch = useDispatch();
    const { message, severity, persistent } = useSelector((state) => state.notification);
    useEffect(() => {
        if (!persistent && message) {
            const timer = setTimeout(() => {
                dispatch(clearNotification());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [dispatch, message, persistent]);
    return (_jsx(Box, { children: _jsx(Snackbar, { open: !!message, autoHideDuration: !persistent ? 6000 : null, onClose: () => dispatch(clearNotification()), children: _jsx(SnackbarContent, { message: message, style: {
                    backgroundColor: severity === "error"
                        ? "red"
                        : severity === "success"
                            ? "green"
                            : "blue",
                } }) }) }));
};
export default NotificationWrapper;
