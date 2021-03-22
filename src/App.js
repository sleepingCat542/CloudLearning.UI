import React from 'react';
import "./icons.css"
import {Redirect, Route, Switch} from "react-router-dom";
import {TestRouter} from "./test/TestRouter";
import {UnauthenticatedRoute} from "./util/UnauthenticatedRoute";
import Main from "./indexPage/Main";
import Login from "./indexPage/login/Login";
import SignUp from "./indexPage/signup/SignUp";
import AuthService from "./util/AuthServise";
import {CoreRouter} from "./authorized/CoreRouter";
import {ConfirmComponent} from "./indexPage/ConfirmComponent";

const state = {
    INDEX: 0,
    TEST_CREATING: 50,
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {page: state.INDEX};
        sessionStorage.setItem("beforeLoginRedirect", "/");
    }

    render() {
        return (
            <Switch>
                <Route exact path={"/login"}>
                    <UnauthenticatedRoute/>
                    <Login/>
                </Route>
                <Route exact path="/">
                    <UnauthenticatedRoute/>
                    <Main/>
                </Route>
                <Route exact path="/logout">
                    <Logout/>
                </Route>
                <Route exact path="/sign_up">
                    <UnauthenticatedRoute/>
                    <SignUp/>
                </Route>
                <Route path="/test/">
                    <TestRouter/>
                </Route>
                <Route exact path={"/confirm/:confirmUid"} component={ConfirmComponent}/>
                <Route path="/" component={CoreRouter}/>
            </Switch>
        );
    }
}

function Logout() {
    AuthService.logout();
    return <Redirect to={"/"}/>
}


export default App;
