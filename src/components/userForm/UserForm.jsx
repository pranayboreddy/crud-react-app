import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import userService from "../../api/services/userService";
import { GlobalContext } from "../../context/GlobalState";

export const UserForm = () => {
  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const { addUser, editUser, users, updateNotificationStatus } =
    useContext(GlobalContext);
  const history = useHistory();
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      userService
        .updateUser(formValues)
        .then((res) => {
          const editUserPayload = formValues;
          editUser(editUserPayload);
          dispatchNotification(new Person(true, "success", "User Edited"));
        })
        .catch((err) => {
          dispatchNotification(
            new Person(true, "error", "Failed to edit the user")
          );
        });
    } else {
      userService
        .createUser(formValues)
        .then((res) => {
          const user = { ...formValues };
          user.id = res.data.id;
          addUser(user);
          dispatchNotification(new Person(true, "success", "User Created"));
        })
        .catch((err) => {
          dispatchNotification(
            new Person(true, "error", "Failed to add the user")
          );
        });
    }
    history.push("/");
  };

  useEffect(() => {
    if (id) {
      const usersList = users.filter((user) => {
        return user.id == id;
      });
      setFormValues(usersList[0]);
    }
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h2" align="center">
        User Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={4} xs={7}>
              <TextField
                required
                fullWidth
                name="first_name"
                label="First Name"
                value={formValues.first_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item md={4} xs={7}>
              <TextField
                required
                fullWidth
                name="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
                label="Last Name"
              />
            </Grid>
            <Grid item md={4} xs={7}>
              <TextField
                required
                type="email"
                fullWidth
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                label="Email"
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent={{ xs: "center", md: "start" }}
          >
            <Button
              variant="contained"
              size="large"
              color="warning"
              onClick={() => history.push("/")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              color="success"
              type="submit"
            >
              {id ? "Edit" : "Add"}
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};
