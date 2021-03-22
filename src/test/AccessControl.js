import * as React from "react";
import styles from "./access_control.module.css";
import axiosInstance from "../util/AxiosInstance";
import {Stage} from "../config/stages";
import {Redirect} from "react-router-dom";

export class AccessControl extends React.Component {

    constructor(props) {
        super(props);
        this.AccessForm = this.AccessForm.bind(this);
        this.SelectionForm = this.SelectionForm.bind(this);
        this.NotAllowedUsers = this.NotAllowedUsers.bind(this);
        this.AllowedUsers = this.AllowedUsers.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.state = {
            notAllowedUsers: [],
            allowedUsers: [],
            selectedGroup: null,
            usersAdd: [],
            usersRemove: [],
            stage: null
        }
    }

    setSelected(id) {
        let state = this.state;
        state.selectedGroup = id;
        if (this.state.selectedGroup != null) {
            axiosInstance.get("group/id" + this.state.selectedGroup + "/users").then(
                (response) => {
                    let state = this.state;
                    state.notAllowedUsers = response.data;
                    for (let notAllowedIndex = 0; notAllowedIndex < state.notAllowedUsers.length; notAllowedIndex++) {
                        let user = state.notAllowedUsers[notAllowedIndex];
                        for (let allowedUser of state.allowedUsers) {
                            if (user.id === allowedUser.id) {
                                state.notAllowedUsers.splice(notAllowedIndex, 1);
                            }
                        }
                    }
                    this.setState(state);
                }
            )
        }
    }


    componentDidMount() {
        axiosInstance.get("/test/id" + this.props.match.params.id + "/management/get_users").then(
            (response) => {
                let state = this.state;
                state.allowedUsers = response.data;
                this.setState(state);
            }
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    SelectionForm() {
        return (
            <div className={styles.selectionForm}>
                <form action="" className={styles.uiForm}>
                    <div className={styles.textForm}>
                        <div className={styles.title}>Users without access</div>
                    </div>
                </form>
                <div className={styles.selector}>
                    <button className={styles.selectorButton}>Group number &darr; </button>
                    <div className={styles.groups}>
                        <Groups setSelected={this.setSelected}/>
                    </div>
                </div>
                <div className={styles.list}>

                    <div className={styles.box}>
                        <this.NotAllowedUsers/>
                    </div>
                </div>
                <div className={styles.position}>
                    <button className={styles.button} onClick={() => {
                        let form = new FormData();
                        console.log(this.state);
                        let data = {delete: this.state.usersRemove, put: this.state.usersAdd};
                        form.append("data", JSON.stringify(data))

                        axiosInstance.patch("/test/id" + this.props.match.params.id + "/patch_allowed_users", form).then(
                            () => {
                                let state = this.state;
                                state.stage = Stage.MANAGEMENT.REDIRECT;
                                this.setState(state);
                            }
                        )
                    }}>Save
                    </button>
                </div>
            </div>
        );

    }

    NotAllowedUsers() {
        return this.state.notAllowedUsers.map(
            (user) => {
                return (
                    <div key={user.id}>
                        <input className={styles.checkbox} type="checkbox" id={"na" + this.props.index}
                               name="checked" onChange={
                            () => {
                                let index = this.state.usersAdd.indexOf(user.id);
                                if (index !== -1) {
                                    this.state.usersAdd.splice(index, 1);
                                } else {
                                    this.state.usersAdd.push(user.id);
                                }
                            }
                        }/>
                        <label htmlFor={"na" + this.props.index}>{user.firstName + " " + user.lastName}</label>
                    </div>
                );
            }
        );
    }

    AccessForm() {

        return (
            <div className={styles.accessForm}>

                <form action="" className={styles.uiForm}>
                    <div className={styles.textForm}>
                        <div className={styles.title}>Users with access</div>
                    </div>
                </form>

                <div className={styles.list}>

                    <div className={styles.box}>
                        <this.AllowedUsers/>
                    </div>

                </div>
            </div>
        );

    }

    AllowedUsers() {
        return this.state.allowedUsers.map(
            (user) => {
                return (
                    <div key={user.id}>
                        <input className={styles.checkbox} type="checkbox" id={"a" + user.id}
                               name="checked" onChange={
                            () => {
                                let index = this.state.usersRemove.indexOf(user.id);
                                if (index !== -1) {
                                    this.state.usersRemove.splice(index, 1);
                                } else {
                                    this.state.usersRemove.push(user.id);
                                }
                            }
                        }/>
                        <label htmlFor={"a" + user.id}>{user.firstName + " " + user.lastName}</label>
                    </div>
                );
            }
        );
    }


    render() {
        if (this.state.stage === Stage.MANAGEMENT.REDIRECT) {
            return <Redirect to={"/"}/>
        }
        return (
            <div>
                <this.SelectionForm/>
                <this.AccessForm/>
            </div>
        );
    }
}

class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {groups: [], selectedIndex: 0, selectedId: null, selectedGroup: {}}
    }

    componentDidMount() {
        axiosInstance.get("/group/list").then(
            (response) => {
                let state = this.state;
                state.groups = response.data;
                this.setState(state);
            }
        )
    }

    render() {
        return this.state.groups.map(
            (group, index) => {
                return <div className={styles.group} key={1000 + index} onClick={
                    () => {
                        let state = this.state;
                        state.selectedIndex = index;
                        state.selectedId = this.state.groups[index].id;
                        this.props.setSelected(this.state.selectedId);
                        this.setState(state);
                    }
                }>{group.code}</div>
            }
        )
    }

}