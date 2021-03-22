import * as React from "react";
import {Stage} from "../../config/stages";
import axiosInstance from "../../util/AxiosInstance";

export class AccessManagementComponent extends React.Component {

    maxId = 0;

    constructor(props) {
        super(props);
        this.state = {stage: Stage.LOADING, users: []};
    }

    submit() {
        console.log("submit");
    }

    componentDidMount() {
        axiosInstance.get("/test/id" + this.props.testId + "/management/get_users").then(function (response) {
            let state = this.state;
            state.users = response.data;
            state.stage = Stage.MANAGEMENT.ACCESS_MANAGEMENT_LIST;
            this.setState(state);
        }.bind(this));
    }

    render() {
        switch (this.state.stage) {
            case Stage.LOADING:
                return (<div>LOADING...</div>);
            case Stage.MANAGEMENT.ACCESS_MANAGEMENT_LIST:
                return (
                    <div>
                        <button onClick={this.props.back}>Go back</button>
                        <button onClick={this.submit}>Submit</button>
                        <table>
                            <thead>
                            <tr>
                                <td>#</td>
                                <td>User</td>
                                <td>Group</td>
                                <td><input type="checkbox" onClick={() => console.log("click all")}/></td>
                            </tr>
                            </thead>
                            <AllowedUsersList list={this.state.users}/>
                        </table>
                    </div>
                );
            default:
                return (
                    <div>ERROR. You can help us to make this platform better by filling this
                        <a href={"/bug_report?page=" + window.location.path}>bug report form</a>.</div>
                );
        }

    }

}

class AllowedUsersList extends React.Component {
    constructor(props) {
        super(props);
        this.ListView = this.ListView.bind(this);
    }

    ListView() {
        return this.props.list.map((user, index) =>
            <tr key={this.maxId++}>
                <td>{index}</td>
                <td><a href={"/user/id" + user.id}>
                    {user.firstName + " " + user.lastName}
                </a></td>
                <td><a href={"/groups/id" + user.group.id}>{user.group.code}</a></td>
                <td><input type="checkbox" onClick={() => console.log("click" + index)}/></td>
            </tr>
        );
    }

    render() {
        return (
            <tbody>
            <this.ListView/>
            </tbody>
        );
    }
}