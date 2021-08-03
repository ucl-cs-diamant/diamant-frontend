import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./app.sass"
import Leaderboards from "./pages/leaderboards";
import Homepage from "./pages/home";

function App() {
    return (    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/leaderboards">lb</Link>
                    </li>
                    <li>
                        <Link to="/home">home</Link>
                    </li>
                </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/leaderboards">
                    <Leaderboards />
                </Route>
                <Route path="/home">
                    <Homepage />
                </Route>
            </Switch>
        </div>
    </Router>)
}

export default App
