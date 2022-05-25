import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound/";
import { NavBar } from "./pages/components/NavBar/NavBar";
import { Vote } from "./pages/Vote/Vote";
import { HomePage } from "./pages/HomePage";
import { AddPoll } from "./pages/AddPoll";
import { Dashboard } from "./pages/Dashboard/";
import { UserAuth } from "./pages/UserAuth/";
import { userInfo } from "./API/user-api";
import { UserContext } from "./Context/UserContextProvider";
import { PrivateRoute } from "./pages/components/Routes/PrivateRoute.jsx";
import { PublicRoute } from "./pages/components/Routes/PublicRoute.jsx";

export const App = () => {
  // context api
  const { setUser } = React.useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await userInfo();
        if (user !== "you are not sigen in.") setUser(user);
      } catch (err) {
        if (err.response) {
          //alert(err.response.data.message);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <Switch>
      <Route path="/vote/" component={Vote} />
      <Route path="/">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/polls-react-app" component={HomePage} />
          <PrivateRoute exact path="/user/dashboard/" component={Dashboard} />
          <PrivateRoute exact path="/polls/add" component={AddPoll} />
          <PublicRoute exact path="/user/account/*" component={UserAuth} />
          <Route component={PageNotFound} />
        </Switch>
      </Route>
      <Route component={PageNotFound} />
    </Switch>
  );
};
