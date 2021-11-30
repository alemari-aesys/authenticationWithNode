import axios from "axios";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();

  const onClick = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let obj = {
      username,
      password,
    };

    axios
      .post("http://localhost:4000/register", obj, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.result === "success") {
          localStorage.setItem("username", res.data.username);
          history.push("/secrets");
        } else {
          history.push("/register");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="first">
        <h1>REGISTER PAGE</h1>
      </div>
      <div className="login">
        <div>
          <input
            style={{ height: "1.5rem" }}
            id="username"
            type="text"
            placeholder="username"
          />
        </div>
        <br />
        <div>
          <input
            style={{ height: "1.5rem" }}
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        <br />
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Register;
