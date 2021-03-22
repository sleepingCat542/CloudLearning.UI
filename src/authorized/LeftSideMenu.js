import * as React from "react";

import styles from "./main.module.css"
import axiosInstance from "../util/AxiosInstance";
import {Link} from "react-router-dom";

export class LeftSideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {}, subjectsList: [], isSubjectMenuOpened: false}
        this.SubjectsList = this.SubjectsList.bind(this);
        this.SubjectsArrayView = this.SubjectsArrayView.bind(this);
        this.subjectMenuStatusSetter = this.subjectMenuStatusSetter.bind(this);
        this.SubjectButton = this.SubjectButton.bind(this);
        this.SubjectsMenu = this.SubjectsMenu.bind(this);
    }

    componentDidMount() {
        axiosInstance.get("/user/profile").then(
            (response) => {
                let state = this.state;
                state.user = response.data;
                this.setState(state);
            }
        )

        axiosInstance.get("/subject/all").then(
            (response) => {
                let state = this.state;
                state.subjectsList = response.data;
                this.setState(state);
            }
        )
    }

    render() {

        let path = window.location.href;

        return (
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Link to={"/profile/id" + this.state.user.id}><img src={process.env.PUBLIC_URL + "/img/profile.png"}
                                                                      alt="logo"/>
                        <username>{this.state.user.username}</username>
                        <name>{this.state.user.firstName + " " + this.state.user.lastName}</name>
                        <hr/>
                    </Link>
                </div>

                <div>
                    <div className={styles.tab}>
                        <MenuButton href="/main" text="Home" isSelected={path.indexOf("/main") !== -1}/>
                    </div>

                    <this.SubjectsMenu path={path}/>

                    <div className={styles.tab}>
                        <MenuButton href="/logout" text="Log out"
                                    isSelected={false}/>
                    </div>
                </div>
                <div className={styles.icons}>

                    <message href="#"><img src={process.env.PUBLIC_URL + "/img/message.png"} alt="msg"/></message>

                    <translate href="#"><img src={process.env.PUBLIC_URL + "/img/translate.png"} alt="translate"/>
                    </translate>
                    <info href="#"><img src={process.env.PUBLIC_URL + "/img/info.png"} alt="info"/></info>
                    <search href="#"><img src={process.env.PUBLIC_URL + "/img/search.png"} alt="search"/></search>

                </div>

            </header>
        );


    }

    SubjectsMenu(props) {
        return (
            <div className={styles.tab} onMouseLeave={() => this.subjectMenuStatusSetter(false)}>
                <this.SubjectButton/>
                <this.SubjectsList path={props.path}/>
            </div>);
    }

    subjectMenuStatusSetter(status) {
        let state = this.state;
        state.isSubjectMenuOpened = status;
        this.setState(state)
    }

    SubjectButton(props) {
        if (props.isSelected || this.state.isSubjectMenuOpened) {
            return (
                <div className={styles.selected}
                     onMouseEnter={() => this.subjectMenuStatusSetter(true)}>Subject &darr;</div>
            );
        } else {
            return (
                <div onMouseEnter={() => this.subjectMenuStatusSetter(true)}>Subject &darr;</div>
            );
        }
    }

    SubjectsList(props) {
        if (this.state.isSubjectMenuOpened) {
            return (
                <section style={{display: "block"}} className={styles.tabContent}>
                    <this.SubjectsArrayView path={props.path}/>
                </section>
            );
        } else {
            return (
                <section style={{display: "none"}} className={styles.tabContent}/>
            );
        }

    }

    SubjectsArrayView(props) {
        if (this.state.subjectsList.length === 0) {
            return (
                <div>
                    No subjects :-(
                </div>
            )
        }
        return this.state.subjectsList.map((subject) =>
            <div key={subject.id}>
                <MenuButton href={"/subject/id" + subject.id} text={subject.name}
                            isSelected={props.path.indexOf("/subject/id" + subject.id) !== -1}/>
            </div>
        );
    }
}


function MenuButton(props) {
    if (props.isSelected) {
        return (
            <ul><div className={styles.selected}>{props.text}</div></ul>
        );
    } else {
        return (
            <ul><Link to={props.href}>{props.text}</Link></ul>
        );
    }
}

