import Axios from "axios";

const apiUrl = "https://polls-nodejs-backend.herokuapp.com/";
//const apiUrl = "http://localhost:8080";

export const submitPoll = async (poll, token) => {
  if (poll && token) {
    try {
      const res = await Axios.post(`${apiUrl}/polls/add/`, { poll, token });
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
        poll.options,
        { withCredentials: true }
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
      const res = await Axios.get(`${apiUrl}/polls/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }
  throw new ErrorEvent("Poll Id Reqired");
};

export const getUserPolls = async (userId, token) => {
  if (!token) token = sessionStorage.getItem("token");
  if (userId && token) {
    try {
      const { data } = await Axios.post(`${apiUrl}/polls/user/${userId}`, {
        token,
      });
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
      const res = await Axios.delete(`${apiUrl}/polls/${pollId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }
  throw new ErrorEvent("Poll Id Reqired");
};
