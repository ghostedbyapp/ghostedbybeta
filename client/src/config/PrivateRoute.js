import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={ props =>
                Auth.isAuthenticated() === true ? 
                (
                    <Component {...props} {...rest} />
                ) : (
                        <Redirect to="/" />
                    )
            }
        />
    );
}