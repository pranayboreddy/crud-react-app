import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { GlobalContext } from "../../context/GlobalState";

const NotificationAlert = () => {
  const { snackBarOptions, updateNotificationStatus } =
    useContext(GlobalContext);
  const { openNotification, notificationType, notificationMessage } =
    snackBarOptions;

  const handleClose = () => {
    updateNotificationStatus({
      openNotification: false,
      notificationType: "success",
      notificationMessage: "",
    });
  };
  return (
    <Snackbar
      open={openNotification}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={notificationType}
        sx={{ width: "100%" }}
      >
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};

export default NotificationAlert;
