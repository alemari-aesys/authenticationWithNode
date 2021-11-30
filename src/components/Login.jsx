import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

const Login = () => {
  const [state, setState] = useState();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const history = useHistory();

  const onClick = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let obj = {
      username,
      password,
    };

    axios
      .post("http://localhost:4000/login", obj, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.result === "success") {
          localStorage.setItem("username", res.data.username);
          history.push("/secrets");
        }
      })
      .catch((err) => {
        setState("no such user");
      });
  };

  return (
    <>
      <div className="first">
        <h1>LOGIN PAGE</h1>
      </div>
      <div className="login">
        <div style={{ marginBottom: "20px" }}>
          <input
            style={{ height: "1.5rem" }}
            id="username"
            type="text"
            placeholder="username"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            style={{ height: "1.5rem" }}
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        {state === "no such user" && (
          <div style={{ color: "red", marginTop: "20px" }}>
            WRONG USERNAME OR PASSWORD
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
