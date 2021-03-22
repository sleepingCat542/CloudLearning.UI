import * as React from "react";
import {Redirect} from "react-router-dom";

export class UnauthenticatedRoute extends React.Component {

    render() {
        if (localStorage.getItem("Authentication") === "true") {
            return (
                <div>
                    <Redirect to="/main"/>
                </div>
            );
        } else {
            return (<div/>);
        }
    }
}