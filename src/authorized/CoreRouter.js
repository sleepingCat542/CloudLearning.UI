import * as React from "react";
import AuthenticatedRoute from "../util/AuthenticatedRoute";
import {Route, Switch} from "react-router-dom";
import {Home} from "./Home";
import {Profile} from "./Profile";
import {Subject} from "./Subject";
import {LeftSideMenu} from "./LeftSideMenu";
import Group from "./Group";

export class CoreRouter extends React.Component {
    render() {
        return (
            <div>
                <AuthenticatedRoute/>
                <LeftSideMenu/>
                <Switch>
                    <Route exact path="/main" component={Home}/>
                    <Route exact path="/profile/id:id" component={Profile}/>
                    <Route exact path="/subject/id:id" component={Subject}/>
                    <Route exact path="/group/id:id" component={Group}/>
                </Switch>
            </div>
        );
    }
}