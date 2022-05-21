import { UserChoice } from "./components/UserChoice";
import React, { Component } from "react";
import { getPoll, pollVote } from "../../../API/poll-api";
import "./styles/main.css";
import { PageNotFound } from "../../PageNotFound";
import { LoaddingPage } from "../../LoaddingPage/LoaddingPage";
import { ErrorPage } from "../../ErrorPage/ErrorPage";

class VotesList {
  constructor() {
    this.votesList = JSON.parse(localStorage.getItem("votesList")) || [];
  }

  add = (pollId) => {
    if (!this.includes(pollId)) {
      this.votesList.push(pollId);
      localStorage.setItem("votesList", JSON.stringify(this.votesList));
    }
  };

  includes = (pollId) => this.votesList.includes(pollId);
}

export class VotePage extends Component {
  constructor(props) {
    super(props);
    this.match = this.props.match;
    this.history = this.props.history;
    this.state = {
      poll: null,
      error: null,
      loadding: false,
    };
    this.votesList = new VotesList();
  }

  async fetchData() {
    try {
      const pollData = await getPoll(this.match.params.id);
      this.setState({ ...this.state, poll: pollData });
    } catch (err) {
      err.type === "Error: Network Error"
        ? this.setState({ ...this.state, error: 501 })
        : this.setState({ ...this.state, error: 404 });
    }
  }

  componentDidMount() {
    if (this.votesList.includes(this.match.params.id)) {
      this.history.push(`/vote/${this.match.params.id}/thanks`);
    } else this.fetchData();
  }

  handleVoting = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, loadding: true });

    const choiceText = event.target.choice.value;

    const updatedOptions = this.state.poll.options.map((option) =>
      option.text === choiceText
        ? { ...option, votes: option.votes + 1 }
        : option
    );

    pollVote({ ...this.state.poll, options: updatedOptions })
      .then((res) => {
        this.setState({ ...this.state, loadding: false });
        this.votesList.add(this.state.poll._id);
        this.history.push(`/vote/${this.match.params.id}/thanks`);
      })
      .catch(() => {
        this.setState({ ...this.state, loadding: false, error: true });
      });
  };

  render() {
    return this.state.error ? (
      this.state.error === 404 ? (
        <PageNotFound />
      ) : (
        <ErrorPage />
      )
    ) : this.state.poll ? (
      <div className="vote-wrapper sm:[max-width:450px] sm:w-full mx-2 ">
        <h1 className="mb-4 ">{this.state.poll.title}</h1>
        <p className="mb-4 text-justify bg-slate-100 rounded-md">
          {this.state.poll.question}
        </p>
        <form className="mb-4" onSubmit={this.handleVoting}>
          {this.state.poll.options.map((choice, index) => (
            <UserChoice key={index} choice={choice} index={index} />
          ))}
          <button id="vote" type="submit">
            {this.state.loadding ? "loadding..." : " Vote"}
          </button>
        </form>
      </div>
    ) : (
      <LoaddingPage />
    );
  }
}
