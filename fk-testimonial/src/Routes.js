import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from './App';
import Users from './Users';
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/testimonial-poc/users">
                    <Users />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>

        </Router>
    );
}
