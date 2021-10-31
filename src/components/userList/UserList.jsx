import React, { useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { GlobalContext } from "../../context/GlobalState";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userService from "../../api/services/userService";

export const UserList = (props) => {
  let {
    users,
    removeUser,
    fetchUsers,
    isDataLoaded,
    updateNotificationStatus,
  } = useContext(GlobalContext);

  class Person {
    constructor(openNotification, notificationType, notificationMessage) {
      this.openNotification = openNotification;
      this.notificationType = notificationType;
      this.notificationMessage = notificationMessage;
    }
  }

  const dispatchNotification = (snackBarOptions) => {
    updateNotificationStatus(snackBarOptions);
  };

  const removeUserFn = (id) => {
    userService
      .deleteUser(id)
      .then((res) => {
        removeUser(id);
        updateNotificationStatus({
          openNotification: true,
          notificationType: "success",
          notificationMessage: "User Deleted",
        });
      })
      .catch((err) => {
        dispatchNotification(
          new Person(true, "error", "Failed to delete the user")
        );
      });
  };

  useEffect(() => {
    !isDataLoaded &&
      userService
        .getUser()
        .then((res) => {
          fetchUsers(res.data.data);
        })
        .catch((err) => {
          dispatchNotification(
            new Person(true, "error", "Failed to fetch the users")
          );
        });
  }, []);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Typography variant="h4">Users List</Typography>
          </Grid>
          <Grid item>
            <RouterLink to="/add">
              <Button variant="contained">Add User</Button>
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        {users.length ? (
          <Grid container direction="row" alignItems={"center"} spacing={2}>
            {users.map(({ first_name, last_name, email, id }) => (
              <React.Fragment key={id}>
                <Grid item xs={8} sm={10}>
                  <Typography>
                    {first_name} {last_name}
                  </Typography>
                  <Link
                    href={`mailto:${email}`}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                  >
                    {email}
                  </Link>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <RouterLink to={`edit/${id}`}>
                    <IconButton color="info">
                      <EditIcon />
                    </IconButton>
                  </RouterLink>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <IconButton color="error" onClick={() => removeUserFn(id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        ) : (
          <Typography align="center" color="error" variant="h4" component="p">
            No users Found
          </Typography>
        )}
      </Box>
    </>
  );
};
