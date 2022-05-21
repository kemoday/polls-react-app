import React, { useEffect, useState } from "react";
import { LoaddingPolls } from "./components/LoaddingPolls";
import { PollsSearch } from "./components/PollsSearch";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { PollsTableHeader } from "./components/PollsTableHeader";
import { PollsList } from "./components/PollsList";
import { UserContext } from "../../Context/UserContextProvider";
import { getUserPolls } from "../../API/poll-api";
import Fuse from "fuse.js";
import "./styles/main.css";

export const Dashboard = (props) => {
  document.title = "Polls - Dashboard";

  const { user, setUser } = React.useContext(UserContext);

  const [query, setQuery] = useState("");
  const [fPolls, setFPolls] = useState([]);
  const [error, setError] = useState(false);

  const fuse = new Fuse([], { keys: ["title"] });

  async function fetchData() {
    if (user?._id !== null) {
      setError(false);
      try {
        const polls = await getUserPolls(user._id);
        setUser({ ...user, polls });
        setFPolls(polls);
      } catch (error) {
        console.log("error while geting the user polls", error);
        setError(true);
      }
    }
  }

  useEffect(() => {
    fetchData();
  });

  function onSearchChange(e) {
    setQuery(e.target.value);
    if (e.target.value !== "") {
      const matches = fuse.search(e.target.value).map((poll) => poll.item);
      setFPolls(matches);
    } else {
      setFPolls(user.polls);
    }
  }

  function sortBy(key) {
    if (key === "title") {
      fPolls.sort();
    } else if (key === "views") {
      fPolls.sort((a, b) => b[key] - a[key]);
    } else if (key === "date") {
      fPolls.sort((a, b) => b[key] - a[key]).reverse();
    } else if (key === "votes") {
      fPolls.sort(
        (a, b) =>
          b.options.reduce((acc, curr) => acc + curr.votes, 0) -
          a.options.reduce((acc, curr) => acc + curr.votes, 0)
      );
    }
    setFPolls(() => [...fPolls]);
  }

  if (error) return <ErrorPage fetchData={fetchData} />;

  return (
    <div className="dashboard-page px-5" style={{ marginTop: "45px" }}>
      <h1>
        <b>Dashboard</b>
      </h1>
      <PollsSearch query={query} onSearchChange={onSearchChange} />
      <div className="lg:overflow-x-scroll lg:overflow-auto">
        <PollsTableHeader sortBy={sortBy} />
        {fPolls === null ? <LoaddingPolls /> : <PollsList polls={fPolls} />}
      </div>
    </div>
  );
};
