import React from "react";
import { useHistory } from "react-router";


const Home = () => {
    const history = useHistory()
    return (
        <>
        <div className="first">
            <h1>WELCOME TO MY SECRETS PAGE</h1>
        </div>
        <div className="second">
            <button className="bttn" onClick={() => history.push("/login")}>LOGIN</button>
            <button className="bttn" onClick={() => history.push("/register")}>REGISTER</button>
        </div>
        </>
    )
}

export default Home;