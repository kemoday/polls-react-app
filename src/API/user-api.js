import Axios from "axios";

Axios.defaults.withCredentials = true;

export const userInfo = async () => {
  try {
    const { data } = await Axios.get(
      `http://localhost:8080/user/account/user`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async (user) => {
  if (user) {
    try {
      const { data } = await Axios.post(
        "http://localhost:8080/user/account/signup",
        user,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export const signin = async (user) => {
  if (user) {
    try {
      const res = await Axios.post(
        `http://localhost:8080/user/account/signin`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
};

export const signout = async () => {
  try {
    const res = await Axios.put("http://localhost:8080/user/account/signout", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
