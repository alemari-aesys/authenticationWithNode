import { Switch, Route, Redirect } from "react-router-dom"
import { useHistory } from "react-router";
import axios from "axios"

const Login = () => {

    const history = useHistory();

    const onClick = async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        let obj = {
            username,
            password
        }

        axios.post("http://localhost:4000/login", obj, {headers: {"Content-Type": "application/json"}})
        .then(res => {
            console.log(res);
            if(res.data.result === "success") {
                localStorage.setItem("username", res.data.username)
                history.push("/secrets")
            }
        })
    }

    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <div><input id="username" type="text" placeholder="username" /></div> <br />
            <div><input id="password" type="text" placeholder="password" /></div> <br />
            <div><button onClick={onClick}>Submit</button></div>
        </div>
    )
}

export default Login;