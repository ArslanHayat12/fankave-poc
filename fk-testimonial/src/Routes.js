import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ReactDOM from 'react-dom'
import { waitForAddedNode } from "./utils/config";
import App from './App';
import Users from './Users';
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/testimonials/users">
                    <Users />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>

        </Router>
    );
}


waitForAddedNode({
    id: 'testimonials',
    recursive: false,
    done: (element) => {
        ReactDOM.render(<Routes />, element)
    }
})
