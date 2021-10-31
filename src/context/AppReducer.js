export const AppReducer = (state, { type, payload }) => {
  const { usersList } = state;
  switch (type) {
    case "FETCH_USERS": {
      return {
        ...state,
        usersList: payload,
        isDataLoaded: true,
      };
    }
    case "ADD_USER": {
      const newUser = { ...payload };
      return {
        ...state,
        usersList: [...usersList, newUser],
      };
    }
    case "EDIT_USER": {
      const index = usersList.findIndex((user) => {
        return user.id === payload.id;
      });
      const existingUsers = [...usersList];
      existingUsers[index] = payload;
      return {
        ...state,
        usersList: [...existingUsers],
      };
    }
    case "REMOVE_USER": {
      return {
        ...state,
        usersList: usersList.filter((user) => {
          return user.id !== payload;
        }),
      };
    }
    case "UPDATE_NOTIFICATION_STATUS": {
      return {
        ...state,
        snackBarOptions: { ...payload },
      };
    }
    default: {
      return state;
    }
  }
};
