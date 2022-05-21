import React from "react";
import { PageNotFound } from "./pages/PageNotFound/";
import { NavBar } from "./pages/components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import { Vote } from "./pages/Vote/Vote";
import { HomePage } from "./pages/Home/HomePage";
import { AddPoll } from "./pages/AddPoll/AddPoll";
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";
import { UserAuth } from "./pages/UserAuth/";
import { userInfo } from "./API/user-api";
import { UserContext } from "./Context/UserContextProvider";
import { useEffect } from "react";

export const App = () => {
  // context api
  const { setUser } = React.useContext(UserContext);

  useEffect(fetchData, []);

  return (
    <Switch>
      <Route path="/vote/" component={Vote} />
      <Route path="/">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/user/dashboard/" component={Dashboard} />
          <Route exact path="/polls/add" component={AddPoll} />
          <Route exact path="/polls-react-app" component={HomePage} />
          <Route exact path="/user/account/*" component={UserAuth} />
          <Route component={PageNotFound} />
        </Switch>
      </Route>
      <Route component={PageNotFound} />
    </Switch>
  );

  async function fetchData() {
    try {
      const user = await userInfo();
      if (user !== "you are not sigen in.") setUser(user);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }
};
