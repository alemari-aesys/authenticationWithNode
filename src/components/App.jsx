import Home from "./Home.jsx"
import Login from "./Login.jsx";
import Register from "./Register"
import { Switch, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute.jsx";
import Secrets from "./Secrets.jsx";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="/register" render={() => <Register />} />
                <PrivateRoute path="/secrets" component={Secrets} />
            </Switch>
        </div>
    )
}

export default App;