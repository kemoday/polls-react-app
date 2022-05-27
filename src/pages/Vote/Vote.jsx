import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { ThankYou } from "../ThankYou";
import { VotePage } from "./VotePage";
import { PageNotFound } from "../PageNotFound";
import "./styles/main.css";

export const Vote = () => {
  return (
    <>
      <Link className="animate-bounce" to={"/user/dashboard"}>
        {" "}
        go to Dashboard
      </Link>
      <div className="vote-page">
        <Switch>
          <Route exact path="/vote/:id/thanks" component={ThankYou} />
          <Route path="/vote/:id" component={VotePage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
};
