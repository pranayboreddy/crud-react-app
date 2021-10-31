import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const initialState = {
  usersList: [],
  isDataLoaded: false,
  snackBarOptions: {
    openNotification: false,
    notificationType: "success",
    notificationMessage: "API is success",
  },
};

export const GlobalContext = createContext(initialState);

export const GolbalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchUsers = (usersList) => {
    dispatch({
      type: "FETCH_USERS",
      payload: usersList,
    });
  };

  const addUser = (user) => {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  };

  const editUser = (payload) => {
    dispatch({
      type: "EDIT_USER",
      payload,
    });
  };

  const removeUser = (id) => {
    dispatch({
      type: "REMOVE_USER",
      payload: id,
    });
  };

  const updateNotificationStatus = (newStatus) => {
    dispatch({
      type: "UPDATE_NOTIFICATION_STATUS",
      payload: newStatus,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        users: state.usersList,
        isDataLoaded: state.isDataLoaded,
        snackBarOptions: state.snackBarOptions,
        fetchUsers,
        addUser,
        editUser,
        removeUser,
        updateNotificationStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
