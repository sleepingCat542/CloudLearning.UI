import * as React from "react";
import styles from "./subject.module.css";
import axiosInstance from "../util/AxiosInstance";
import {Stage} from "../config/stages";
import {Link, Redirect} from "react-router-dom";

export class Subject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stage: Stage.LOADING, subject: {hasTestCreateAccess: false, teachers: []}};
        this.SubjectName = this.SubjectName.bind(this);
        this.Teachers = this.Teachers.bind(this);
        this.TestForm = this.TestForm.bind(this);
        this.CreateButton = this.CreateButton.bind(this);
        this.TeachersListView = this.TeachersListView.bind(this);
        this.TestListView = this.TestListView.bind(this);
    }

    componentDidMount() {
        axiosInstance.get("/subject/id" + this.props.match.params.id).then(
            (response) => {
                let state = this.state;
                state.subject = response.data;
                this.setState(state);
            }
        );
        axiosInstance.get("/subject/id" + this.props.match.params.id + "/getAllowedTests").then(
            (response) => {
                let state = this.state;
                state.allowedTests = response.data;
                state.stage = Stage.SUBJECT.SUBJECT_INFO;
                this.setState(state);
            }
        )
        axiosInstance.get("/subject/id" + this.props.match.params.id + "/createTest").then(
            (response) => {
                this.setState((prevState) => {
                    let state = prevState;
                    state.subject.hasTestCreateAccess = response.data;
                    return state;
                });
            }
        )
    }


    CreateButton(props) {
        if (props.visible) {

            return (
                <div className={styles.create}>
                    <button className={styles.button} onClick={
                        (event) => {
                            event.preventDefault();
                            let state = this.state;
                            state.stage = Stage.SUBJECT.REDIRECT;
                            this.setState(state);
                        }
                    }>Create test
                    </button>
                </div>);
        } else {
            return <div/>
        }
    }

    SubjectName() {
        return (
            <div className={styles.nameForm}>
                <form action="" className={styles.uiForm}>
                    <div className={styles.textForm}>
                        <div className={styles.subjectName} id={"name"}>{this.state.subject.name}</div>
                        <label htmlFor="name">Subject name</label>
                        <this.CreateButton visible={this.state.subject.hasTestCreateAccess}/>
                    </div>
                </form>
            </div>
        );
    }

    Teachers() {
        return (

            <div className={styles.teacherForm}>
                <label>Teacher list</label>
                <this.TeachersListView/>
            </div>
        );
    }

    TeachersListView() {
        return this.state.subject.teachers.map(
            (user, index) => {
                return (
                    <Link key={index * -1} to={"/profile/id" + user.id}>
                        <div className={styles.teacher}>
                            {user.firstName + " " + user.lastName}
                        </div>
                    </Link>);
            }
        );
    }


    TestForm() {
        return (
            <div className={styles.testForm}>
                <label>Test list</label>
                <this.TestListView/>
            </div>
        );

    }

    ManageButton(props) {
        if (props.test.canEdit) {
            return (
                <Link to={"/test/id" + props.test.id + "/management"}>
                    <img className={styles.settings} src={process.env.PUBLIC_URL + "/img/settings.png"} alt="settings"/>
                </Link>);
        } else {
            return (<div/>)
        }
    }

    TestListView() {
        return this.state.allowedTests.map(
            (test, index) => {
                return (
                    <div>
                        <div key={index} className={styles.test}>
                            {test.name}
                        </div>
                        <this.ManageButton test={test}/>
                        <Link to={"/test/id" + test.id + "/complete"}>
                            <img className={styles.start} src={process.env.PUBLIC_URL + "/img/start.png"} alt="start"/>
                        </Link>
                    </div>
                )
            }
        );
    }

    render() {

        switch (this.state.stage) {
            case Stage.SUBJECT.REDIRECT:
                return (<Redirect
                    to={"/test/create/subjectId" + this.state.subject.id}/>);

            case Stage.SUBJECT.SUBJECT_INFO:
                return (
                    <div>

                        <this.SubjectName/>
                        <this.Teachers/>
                        <this.TestForm/>


                    </div>


                );
            case Stage.LOADING:
                return (<div>LOADING...</div>);
            default:
                return (<div>ERROR</div>);
        }

    }

}