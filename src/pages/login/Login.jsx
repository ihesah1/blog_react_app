import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const res = await axios
      .post(
        "https://blogapiksa.herokuapp.com/api/auth/login",
        {
          username: username,
          password: password,
        },
        // headers
      )
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link
          style={{ color: "white", textDecoration: "none" }}
          className="link"
          to="/register"
        >
          Register
        </Link>
      </button>
    </div>
  );
}
