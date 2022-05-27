import React from "react";
import "./styles/main.css";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../../Context/UserContextProvider";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export const NavBar = () => {
  const { user, setUser, setToken } = useContext(UserContext);
  const history = useHistory();

  return (
    <div className="absolute top-0 left-0 w-full bg-[#15b4a6] flex justify-between">
      <div className="grid items-center md:ml-5 lg:ml-5 xl:ml-5">
        <Link
          to="/"
          className="text-3xl rounded active:text-[#aaa] font-bold mr-8 hover:text-[#283e47] duration-500 text-[#ecebeb]"
        >
          <span className="duration-1000 active:text-[#aaa] hover:text-[#283e47] fas fa-poll text-3xl ml-5 mr-1"></span>
          Polls
        </Link>
      </div>

      {!user?._id ? (
        <div className="hidden   [flex:1] md:block lg:block my-2">
          <NavLink
            activeClassName="bg-[#283e47]"
            className="ml-2 rounded active:text-[#aaa] py-2 px-2 text-[#ecebeb] duration-500 hover:bg-[#283e47]"
            to="/user/account/signup"
          >
            Sign Up <span className="fas fa-user-plus"></span>
          </NavLink>
          <NavLink
            activeClassName="bg-[#283e47]"
            className="ml-2 active:text-[#aaa] rounded py-2 px-2 text-[#ecebeb] duration-500 hover:bg-[#283e47]"
            to="/user/account/signin"
          >
            Log In <span className="fas fa-sign-in-alt"></span>
          </NavLink>
        </div>
      ) : (
        <div className="hidden  [flex:1] md:block lg:block">
          <NavLink
            activeClassName="bg-[#283e47]"
            to="/user/dashboard/"
            className="py-2 active:text-[#aaa] px-2 text-[#ecebeb] duration-500 hover:bg-[#283e47]"
          >
            <span className="fas fa-chart-line mr-1 duration-100"></span>
            Dashboard
          </NavLink>
          <NavLink
            activeClassName="bg-[#283e47]"
            to="/polls/add"
            className="py-2 active:text-[#aaa] px-2 text-[#ecebeb] duration-500 hover:bg-[#283e47]"
          >
            <span className="fas fa-plus mr-1 duration-100"></span>Add Poll
          </NavLink>
          <button
            onClick={(e) => {
              setUser(null);
              setToken(null);
              sessionStorage.removeItem("token");
              history.push("/user/account/signin");
            }}
            className="py-2 active:text-[#aaa] px-2 text-[#ecebeb] duration-500 hover:bg-[#283e47]"
          >
            Log Out <span className="fas fa-sign-out-alt"></span>
          </button>
        </div>
      )}
      <div className="sm:mr-1 lg:mr-5 md:mr-5 xlg:mr-5">
        <button className="p-2 active:text-[#aaa] text-[#ecebeb] duration-500 hover:text-[#ccc]">
          <span className="fas fa-bars"></span>
        </button>
      </div>
    </div>
  );
};
