import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThankYou } from "../../pages/ThankYou/ThankYou";
import { VotePage } from "./VotePage/VotePage";
import { PageNotFound } from "../PageNotFound";
import "./styles/main.css";

export const Vote = () => {
  return (
    <div className="vote-page">
      <Switch>
        <Route exact path="/vote/:id/thanks" component={ThankYou} />
        <Route path="/vote/:id" component={VotePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};
