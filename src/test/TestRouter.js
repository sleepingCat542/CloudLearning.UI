import * as React from "react";
import {Route, Switch} from "react-router-dom";
import TestCreateWindow from "./testCreating/TestCreateWindow";
import {TestCompletingComponent} from "./testCompleting/TestCompletingComponent";
import {ResultComponent} from "../result/ResultComponent";
import {LeftSideMenu} from "../authorized/LeftSideMenu";
import {AccessControl} from "./AccessControl";

export class TestRouter extends React.Component {
    render() {
        return (

            <div>
                <LeftSideMenu/>
                <Switch>
                    <Route path="/test/create/subjectId:subjectId" component={TestCreateWindow}/>
                    <Route path="/test/id:id/complete" component={TestCompletingComponent}/>
                    <Route path="/test/result/id:id" component={ResultComponent}/>
                    <Route path="/test/id:id/management" component={AccessControl}/>
                </Switch>
            </div>
        );
    }
}