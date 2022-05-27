import Axios from "axios";

const apiUrl = "https://polls-nodejs-backend.herokuapp.com/";
//const apiUrl = "http://localhost:8080/";

export const userInfo = async (token) => {
  try {
    console.log("getting user info");
    const { data } = await Axios.post(`${apiUrl}user/account/info/`, { token });
    return data;
  } catch (error) {
    console.log("error");
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
      sessionStorage.getItem("token") && sessionStorage.removeItem("token");
      const res = await Axios.post(`${apiUrl}user/account/signin`, user);
      sessionStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
};
