import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { submitPoll } from "../../API/poll-api";
import { UserContext } from "../../Context/UserContextProvider";
import { AdminOptionList } from "../components/AdminOptionList/AdminOptionList";
import { PublishButton } from "../components/PublishButton/PublishButton";
import "./styles/main.css";

export const AddPoll = () => {
  document.title = "Poll - Add new";

  const { user, setUser, token } = useContext(UserContext);

  const [data, setData] = useState({
    title: "",
    question: "",
    options: [{ id: 0, text: "" }],
    count: 0, // to genrate new option id
    loadding: false,
    error: null,
  });

  const history = useHistory();

  const handleRemoveOption = (id) => {
    if (data.options.length > 1) {
      setData({
        ...data,
        options: data.options.filter((option) => option.id !== id),
      });
    }
  };

  const handleAddOption = (id) => {
    if (data.options.length < 5) {
      const option = {
        id: data.count + 1,
        text: "",
      };

      // find the currnt obj index
      let currindex = 0;

      data.options.forEach((op, index) => {
        if (op.id === id) {
          currindex = index;
        }
      });
      // insert an item below that object
      const opionsList = [...data.options];
      opionsList.splice(currindex + 1, 0, option);

      // update the list of options
      setData({ ...data, options: opionsList, count: data.count + 1 });
    }
  };

  const handleOptionChange = (event, option) => {
    // update the currnt obj
    option.text = event.target.value;

    // overwrit the old obj
    setData({
      ...data,
      options: data.options.map((op) => (op.id === option.id ? option : op)),
    });
  };

  const handleDataChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData({ ...data, loadding: true, error: null });

    const userId = user._id;

    const pollData = {
      userId,
      title: data.title,
      question: data.question,
      options: data.options.map((op) => {
        return { text: op.text, votes: 0 };
      }),
    };

    submitPoll(pollData, token)
      .then((_data) => {
        setData({ ...data, loadding: false, error: false });
        setUser({ ...user, polls: user.polls.push(_data) });
        history.push("/user/dashboard");
      })
      .catch((err) => {
        alert("error while submiting", err);
        setData({ ...data, loadding: false });
        setData({ ...data, error: "Error, try again after a few seconds." });
      });
  };

  return (
    <div className="add-poll mt-11">
      <div className="content-wrapper">
        <h1>
          <b>ADD NEW POLL</b>
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            onChange={handleDataChange}
            required
            value={data.title}
            type="text"
            name="title"
            placeholder="Poll's title"
            id="title"
          />
          <textarea
            required
            onChange={handleDataChange}
            value={data.question}
            placeholder="your question goes here..."
            name="question"
            id="question"
            cols="30"
            rows="5"
          ></textarea>
          <h2>
            Poll's Options ({data.options?.length} of 5)
            {data.options?.length === 5 && (
              <>
                do you wont more options?{" "}
                <Link
                  className="hover:no-underline underline"
                  to="/vote/123/thanks"
                >
                  upgrade now
                </Link>
              </>
            )}
          </h2>
          <AdminOptionList
            options={data.options}
            handleOptionChange={handleOptionChange}
            handleAddOption={handleAddOption}
            handleRemoveOption={handleRemoveOption}
          />
          <div style={{ color: "red" }}>{data.error}</div>
          <PublishButton loadding={data.loadding} />
        </form>
      </div>
    </div>
  );
};
