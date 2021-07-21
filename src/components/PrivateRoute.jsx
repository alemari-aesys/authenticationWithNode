import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({component: Component}) => {
    const user = localStorage.getItem("username");

    return <Route render={() => user ? <Component /> : <Redirect to="/login" />} />
        

}

export default PrivateRoute