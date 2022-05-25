import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signin } from "./../../API/user-api.js";

import { UserContext } from "./../../Context/UserContextProvider";

export function SignIn() {
  // context api
  const { setUser } = React.useContext(UserContext);

  //handle routing
  const history = useHistory();

  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitted(true);
    if (email === "" || password === "") {
      setError("All field are required");
      setSubmitted(false);
      return;
    }
    try {
      const user = await signin({ email, password });
      setUser(user);
      history.replace("/user/dashboard");
    } catch (err) {
      setSubmitted(false);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("error while submiting");
      }
    }
  };

  // Showing error message if error is true

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="my-4 p-4 bg-red-200 rounded-lg font-bold"
        style={{
          display: error ? "" : "none",
        }}
      >
        <p>{error}</p>
      </div>
    );
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto sm:p-8 p-4 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Welcome to Polls</h3>
          <p className="text-gray-600 pt-2">Sign in to your account.</p>
        </section>
        {errorMessage()}
        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                value={email}
                onChange={handleEmail}
                type="text"
                id="email"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-[#15b4a6] transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="password"
              >
                Password
              </label>
              <input
                required
                value={password}
                onChange={handlePassword}
                type="password"
                id="password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-[#15b4a6] transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="flex mb-2">
              <p className="">
                Don't have an account?{" "}
                <Link
                  to="/user/account/signup"
                  className="font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <button
              className={`bg-[#15b4a6] hover:bg-[#283e47] text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-500 ${
                submitted ? "animate-pulse" : "animate-none"
              }`}
              type="submit"
            >
              {submitted ? "Loading..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
