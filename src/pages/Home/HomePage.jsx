import React from "react";
import heroImage from "./images/statistics-illustration.png";
import "./../../index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";
import { useContext } from "react";

export const HomePage = () => {
  document.title = "Polls Home Page";
  const { user } = useContext(UserContext);

  return (
    <div className="p-11 box-border h-screen flex flex-col lg:flex-row items-center justify-center bg-[#b9e0df]">
      <div className="mr-50">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <li className="fa fa-poll"></li> Polls
        </h1>
        <div className="bg-white rounded-md p-4 mb-5">
          <h2 className="text-2xl font-bold mb-2">
            Collect audience's opinions
          </h2>
          <p className="">
            create and share polls with your audience, let them know how much
            you care about them, let them choose what is important for them so
            you know what the next step.
          </p>
        </div>
        <ul className={`m-4 ml-0 mt-4 ${user ? "hidden" : "flex"}`}>
          <li>
            <Link
              className="bg-[#15b4a6] duration-500 hover:bg-[#283e47] text-white mr-2 px-4 py-2 rounded cursor-pointer"
              to="/user/account/signup"
            >
              Sign Up <span className="fas fa-user-plus"></span>
            </Link>
          </li>
          <li>
            <Link
              className="bg-[#15b4a6] duration-500 hover:bg-[#283e47] text-white mr-2 px-4 py-2 rounded cursor-pointer"
              to="/user/account/signin"
            >
              Log In <span className="fas fa-sign-in-alt"></span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sm:grid place-items-center hidden">
        <img
          className="sm:mt-4 lg:w-2/3 lg:ml-8 animate-pulse"
          src={heroImage}
          alt=""
        />
      </div>
    </div>
  );
};
