import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserForm } from "./components/userForm/UserForm";
import { UserList } from "./components/userList/UserList";

export const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={UserList} />

      <Route path="/add" component={UserForm} />

      <Route path="/edit/:id" component={UserForm} />
    </Switch>
  );
};
