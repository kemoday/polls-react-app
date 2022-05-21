import React from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Route, Switch } from "react-router-dom";

export function UserAuth() {
  return (
    <div className=" pt-8">
      <Switch>
        <Route path="/user/account/signup" component={SignUp} />
        <Route path="/user/account/*" component={SignIn} />
      </Switch>
    </div>
  );
}
