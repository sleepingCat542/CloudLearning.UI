import * as React from "react";
import Redirect from "react-router-dom/es/Redirect";

export default class AuthenticatedRoute extends React.Component {

    render() {
        if (localStorage.getItem("Authentication") !== "true") {
            sessionStorage.setItem("beforeLoginRedirect", window.location.pathname);
            return (
                <Redirect to="/login"/>
            );
        } else {
            return (<div/>);
        }
    }
}