import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/signin.component";
import SignUp from "./components/signup.component";
import QAConfig from "./components/qaconfig.component";
import MyTable from "./components/qaconndetails.component";
import QAConfigEdit from "./components/qaconfigedit.component";

function App() {
    return (<Router>
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"} >Central Quality Assurance Tool</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path="/sign-in" component={Login} />
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/qaconfig" component={QAConfig} />
                        <Route path="/table" component={MyTable} />
                        <Route path="/qaconfigedit" component={QAConfigEdit} />  
                    </Switch>
                </div>
            </div>
        </div></Router>
    );
}

export default App;