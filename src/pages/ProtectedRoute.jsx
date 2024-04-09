import {useContext} from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";


//This is done to route the intial user directly to the login page
const ProtectedRoute = ({children}) => {
    const { isUserLoggedIn }=useContext(AuthContext);

    if (!isUserLoggedIn()) {
        return <Navigate to='/login' replace></Navigate>
    }
    return children;

}

export default ProtectedRoute;
