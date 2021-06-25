import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import ListProject from "./pages/ListProject/ListProject";
import ListTask from "./pages/Task/ListTask.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";

function App() {
    const checkAuth = () => {};
    const auth = false;
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" component={Login} exact />
                    <Route path="/project" exact>
                        {/* {auth ? <ListProject /> : <Login />} */}
                        <ListProject />
                    </Route>
                    <Route path="/tasks" exact>
                        <ListTask />
                    </Route>
                    <Route path="/task/:id" exact>
                        <ListTask />
                    </Route>
                    <Route path="/sign-up" component={Register} exact />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
