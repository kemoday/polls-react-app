import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../Context/UserContextProvider";
import { Link } from "react-router-dom";
import { signup } from "./../../API/user-api.js";

export function SignUp() {
  // context api
  const { setUser } = React.useContext(UserContext);

  //handle routing
  const history = useHistory();

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

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
    if (name === "" || email === "" || password === "") {
      setError("All field are required");
      setSubmitted(false);
      return;
    }
    try {
      const user = await signup({ name, email, password });
      setUser(user);
      history.replace("/user/dashboard");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        {
          setSubmitted(false);
          setError("error while submiting");
        }
      }
    }
  };

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
        <section className="mb-2">
          <h3 className="font-bold text-2xl">Welcome to Polls</h3>
          <p className="text-gray-600 pt-2">Sign up for a new account.</p>
        </section>
        {errorMessage()}
        <section className="">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="name"
              >
                Name
              </label>
              <input
                required
                value={name}
                onChange={handleName}
                type="text"
                id="name"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-[#15b4a6] transition duration-500 px-3 pb-3"
              />
            </div>
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
                already have an account?{" "}
                <Link
                  to="/user/account/signin"
                  className="font-bold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <button
              className={`bg-[#15b4a6] hover:bg-[#283e47] text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-500 ${
                submitted ? "animate-pulse" : "animate-none"
              }`}
              type="submit"
            >
              {submitted ? "Loading..." : "Sign Up"}
            </button>{" "}
          </form>
        </section>
      </main>
    </>
  );
}
