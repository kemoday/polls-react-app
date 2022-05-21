import Axios from "axios";

Axios.defaults.withCredentials = true;
const apiUrl = "http://localhost:8080";

export const userInfo = async () => {
  try {
    const { data } = await Axios.get(`${apiUrl}user/account/user`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async (user) => {
  if (user) {
    try {
      const { data } = await Axios.post(`${apiUrl}user/account/signup`, user);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export const signin = async (user) => {
  if (user) {
    try {
      const res = await Axios.post(`${apiUrl}user/account/signin`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
};

export const signout = async () => {
  try {
    const res = await Axios.put(`${apiUrl}user/account/signout`);
    return res.data;
  } catch (error) {
    return error;
  }
};
