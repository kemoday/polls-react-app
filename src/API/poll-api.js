import Axios from "axios";

const apiUrl = "http://localhost:8080";

export const submitPoll = async (poll) => {
  if (poll) {
    console.log("a poll to submit", poll);
    try {
      const res = await Axios.post(`${apiUrl}/polls/}`, poll);
      return res.data;
    } catch (error) {
      return error;
    }
  }
};

export const pollVote = async (poll) => {
  if (poll) {
    try {
      const res = await Axios.put(
        `${apiUrl}/polls/vote/${poll._id}`,
        poll.options
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
};

export const getPoll = async (id) => {
  if (id) {
    try {
      const res = await Axios.get(`${apiUrl}/polls/${id}`);
      return res.data;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }
  throw new ErrorEvent("Poll Id Reqired");
};

export const getUserPolls = async (userId) => {
  if (userId) {
    try {
      const { data } = await Axios.get(`${apiUrl}/polls/user/${userId}`);
      return data;
    } catch (error) {
      throw new ErrorEvent("Error");
    }
  }
  throw new ErrorEvent("Poll Id Reqired");
};

export const deletePoll = async (pollId) => {
  if (pollId) {
    try {
      const res = await Axios.delete(`${apiUrl}/polls/${pollId}`);
      return res.data;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }
  throw new ErrorEvent("Poll Id Reqired");
};
