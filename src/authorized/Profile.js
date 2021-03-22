import * as React from "react";
import styles from "./main.module.css";
import {Stage} from "../config/stages";
import axiosInstance from "../util/AxiosInstance";
import {Link} from "react-router-dom";
import config from "../config";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: Stage.LOADING,
            user: {
                isOwner: false,
                group: null
            },
            results: []
        };
        this.ProfileForm = this.ProfileForm.bind(this);
        this.ResultsForm = this.ResultsForm.bind(this);
        this.TestResultsList = this.TestResultsList.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.EditButton = this.EditButton.bind(this);
    }

    componentDidMount() {
        this.getInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getInfo();
        }
    }

    getInfo() {
        axiosInstance.get("/user/id" + this.props.match.params.id + "/profile").then(
            (response) => {
                let user = response.data;
                this.setState(() => ({
                        stage: Stage.PROFILE.SHOW,
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email,
                            group: {
                                id: user.group.id,
                                code: user.group.code,
                            }

                        }
                    })
                );
            }
        )
        axiosInstance.get("/user/profile/edit?id=" + this.props.match.params.id).then((response) => {
                let state = this.state;
                state.user.isOwner = response.data;
                this.setState(state);
            }
        )
        axiosInstance.get("/test/result/list?userId=" + this.props.match.params.id).then(
            (response) => {
                let state = this.state;
                state.results = response.data;
                this.setState(state);
            }
        );
    }

    TestResultsList() {
        if (this.state.user.isOwner) {
            return this.state.results.map(
                (result, index) => {
                    return (
                        <Link to={"/test/result/id" + result.id}>

                            <div key={index} className={styles.result}>

                                <div className={styles.date}>
                                    {result.date}
                                </div>
                                <div className={styles.name}>
                                    {result.testName}
                                </div>
                                <div className={styles.mark}>
                                    Mark: {result.mark}
                                </div>

                            </div>

                        </Link>

                    );

                }
            )
        } else {
            return this.state.results.map(
                (result, index) => {
                    return (
                        <div key={index} className={styles.result}>
                            <div className={styles.date}>
                                {result.date}
                            </div>
                            <div className={styles.name}>
                                {result.testName}
                            </div>
                            <div className={styles.mark}>
                                Mark: {result.mark}
                            </div>
                        </div>
                    );

                }
            )
        }
    }

    EditButton() {
        if (this.state.user.isOwner) {
            return (<img className={styles.edit} src={process.env.PUBLIC_URL + "/img/edit.png"} alt="edit" onClick={
                () => {
                    let state = this.state;
                    state.stage = Stage.PROFILE.EDIT;
                    this.setState(state);
                }
            }/>);
        } else {
            return (<div/>);
        }
    }

    ResultsForm() {
        return (
            <div className={styles.contentForm}>


                <div className={styles.title}>Test results</div>


                <div className={styles.list}>
                    <this.TestResultsList/>
                </div>


            </div>
        );
    }

    ProfileForm() {
        return (
            <div className={styles.profileForm}>
                <img className={styles.profileImg} src={process.env.PUBLIC_URL + "/img/profileImage.png"}
                     alt="profileImg"/>

                <form action="" className={styles.uiForm}>
                    <div className={styles.textForm}>
                        <div className={styles.userName}>{this.state.user.username}</div>
                        <label>Username</label>
                    </div>
                    <div className={styles.textForm}>
                        <div className={styles.firstName}>{this.state.user.firstName}</div>
                        <label>First name</label>
                    </div>
                    <div className={styles.textForm}>
                        <div className={styles.lastName}>{this.state.user.lastName}</div>
                        <label>Last name</label>
                    </div>
                    <div className={styles.textForm}>
                        <div className={styles.email}>{this.state.user.email}</div>
                        <label>Email</label>
                    </div>
                    <div className={styles.textForm}>
                        <a href={config.url + "/group/id" + this.state.user.group.id}
                           className={styles.groupNum}>{this.state.user.group.code}</a>
                        <label>Group number</label>
                    </div>
                    <this.EditButton/>
                </form>


            </div>
        );
    }

    render() {
        switch (this.state.stage) {
            case Stage.LOADING:
                return (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                );
            case Stage.PROFILE.SHOW:
                return (
                    <div>
                        <this.ResultsForm/>
                        <this.ProfileForm/>
                    </div>
                );
            case Stage.PROFILE.EDIT:
                return (
                    <div>
                        <this.ResultsForm/>
                        <EditProfileForm user={this.state.user} goBack={() => {
                            let state = this.state;
                            state.stage = Stage.PROFILE.SHOW;
                            this.setState(state)
                        }}/>
                    </div>
                );
            default:
                return (
                    <div>
                        ERROR
                    </div>
                );
        }


    }
}


class EditProfileForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: this.props.user};
    }

    submit() {


        axiosInstance.post("/user/profile/edit",
            {
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                group: this.state.user.group.code,
            }
            ).then(
            () => {
                this.props.goBack()
            }
        );
    }

    render() {
        return (
            <div className={styles.profileForm}>
                <img className={styles.profileImg} src={process.env.PUBLIC_URL + "/img/profileImage.png"}
                     alt="profileImg"/>

                <img className={styles.cancel} src={process.env.PUBLIC_URL + "/img/cancel.png"} alt="cancel"
                     onClick={this.props.goBack}/>

                <form action="" className={styles.uiForm}>
                    <div className={styles.textForm}>
                        <div className={styles.userName}>{this.state.user.username}</div>
                        <label>Username</label>
                    </div>
                    <div className={styles.textForm}>
                        <input id="firstName" type="text" value={this.state.user.firstName} required autoComplete="off"
                               onChange={
                                   (event) => {
                                       let state = this.state;
                                       state.user.firstName = event.target.value;
                                       this.setState(state);
                                   }
                               }/>

                        <label htmlFor="firstName">First name</label>
                    </div>
                    <div className={styles.textForm}>
                        <input id="lastName" type="text" value={this.state.user.lastName} required autoComplete="off"
                               onChange={
                                   (event) => {
                                       let state = this.state;
                                       state.user.lastName = event.target.value;
                                       this.setState(state);
                                   }
                               }/>
                        <label htmlFor="lastName">Last name</label>
                    </div>
                    <div className={styles.textForm}>
                        <div className={styles.email}>{this.state.user.email}</div>
                        <label>Email</label>
                    </div>
                    <div className={styles.textForm}>
                        <input id="groupNum" type="text" value={this.state.user.group.code} required autoComplete="off"
                               onChange={
                                   (event) => {
                                       let state = this.state;
                                       state.user.group.code = event.target.value;
                                       this.setState(state);
                                   }
                               }/>

                        <label htmlFor="groupNum">Group number</label>
                    </div>
                    <img className={styles.ok} src={process.env.PUBLIC_URL + "/img/ok.png"} alt="ok"
                         onClick={this.submit.bind(this)}/>
                </form>
            </div>
        );
    }
}