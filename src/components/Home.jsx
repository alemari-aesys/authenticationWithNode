import React from "react";
import { useHistory } from "react-router";


const Home = () => {
    const history = useHistory()
    return (
        <div>
            <h1>WELCOME</h1>
            <button onClick={() => history.push("/login")}>LOGIN</button>
            <button onClick={() => history.push("/register")}>REGISTER</button>
        </div>
    )
}

export default Home;