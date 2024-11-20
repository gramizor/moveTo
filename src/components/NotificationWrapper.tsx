import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Snackbar, SnackbarContent } from "@mui/material";
import { clearNotification } from "../slices/Notification/notificationSlice";
import { RootState } from "../slices/store";

const NotificationWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const { message, severity, persistent } = useSelector(
    (state: RootState) => state.notification,
  );

  useEffect(() => {
    if (!persistent && message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, message, persistent]);

  return (
    <Box>
      <Snackbar
        open={!!message}
        autoHideDuration={!persistent ? 6000 : null}
        onClose={() => dispatch(clearNotification())}
      >
        <SnackbarContent
          message={message}
          style={{
            backgroundColor:
              severity === "error"
                ? "red"
                : severity === "success"
                  ? "green"
                  : "blue",
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default NotificationWrapper;
