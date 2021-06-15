import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import ListProject from "./pages/ListProject/ListProject";
import Task from "./pages/Task/Task";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" component={Login} exact />
                    <Route path="/project" component={ListProject} />
                    <Route path="/task" component={Task} />
                    <Route path="/sign-up" component={Register} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
