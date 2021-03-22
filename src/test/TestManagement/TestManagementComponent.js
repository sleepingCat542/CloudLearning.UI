import * as React from "react";
import {Stage} from "../../config/stages";
import axiosInstance from "../../util/AxiosInstance";
import {AccessManagementComponent} from "./AccessManagementComponent";

export class TestManagementComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stage: Stage.LOADING, test: {}};
    }

    componentDidMount() {
        axiosInstance.get("/test/id" + this.props.match.params.id + "/get_test_info").then(
            (response) => {
                let state = this.state;
                state.test = response.data;
                state.stage = Stage.MANAGEMENT.TEST_INFO;
                this.setState(state);
            }
        ).catch(function (error) {
            if (error.response.status === 403) {
                let state = this.state;
                state.stage = Stage.MANAGEMENT.NO_ACCESS;
                this.setState(state);
            }
        }.bind(this));
    }

    render() {
        switch (this.state.stage) {
            case Stage.LOADING:
                return (
                    <div>LOADING...</div>
                );
            case Stage.MANAGEMENT.TEST_INFO:
                return (
                    <div>
                        <h1>Test name: {this.state.test.name}</h1>
                        <button onClick={function () {
                            let state = this.state;
                            state.stage = Stage.MANAGEMENT.ACCESS_MANAGEMENT;
                            this.setState(state);
                        }.bind(this)}>Manage access
                        </button>
                    </div>
                );
            case Stage.MANAGEMENT.ACCESS_MANAGEMENT:
                return (
                    <AccessManagementComponent testId={this.state.test.id} back={function () {
                        let state = this.state;
                        state.stage = Stage.MANAGEMENT.TEST_INFO;
                        this.setState(state);
                    }.bind(this)}/>
                );
            default:
                return (
                    <div>ERROR. You can help us to make this platform better by filling this
                        <a href={"/bug_report?page=" + window.location.path}>bug report form</a>.</div>
                );
        }
    }

}