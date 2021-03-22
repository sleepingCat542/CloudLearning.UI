import React from "react";
import SingleSelectQuestion from "./questionsComponents/SingleSelectQuestion/SingleSelectQuestion";
import ButtonNext from "./ButtonNext";
import ButtonPrev from "./ButtonPrev";
import MultipleSelectQuestion from "./questionsComponents/MultipleSelectQuestion/MultipleSelectQuestion";
import WritingQuestion from "./questionsComponents/WritingQuestion/WritingQuestion";
import ButtonSubmit from "./ButtonSubmit";
import axiosInstance from "../../util/AxiosInstance";
import {Stage} from "../../config/stages";

import styles from "./testCompleting.module.css"
import {QuestionTypes} from "../../config/QuestionsTypes";


export default class TestCompleteWindow extends React.Component {
    constructor(props) {
        super(props);

        let answers = {};
        let questions = this.props.test.questions;

        for (let i = 0; i < questions.length; i++) {
            switch (questions[i].type) {
                case QuestionTypes.SINGLE_SELECT_QUESTION:
                    answers[questions[i].id] = null;
                    break;
                case QuestionTypes.WRITING_QUESTION:
                    answers[questions[i].id] = "";
                    break;
                case QuestionTypes.MULTIPLE_SELECT_QUESTION:
                    answers[questions[i].id] = [];
                    break;
                default:
                    answers[questions[i].id] = null;
                    break;
            }

        }

        this.state = {
            test: this.props.test,
            answers: answers,
            currentId: 0,
        };

        this.buttonPrev = this.buttonPrev.bind(this);
        this.buttonNext = this.buttonNext.bind(this);
        this.QuestionForm = this.QuestionForm.bind(this);
    }

    maxId = -1;

    buttonNext() {
        this.setState((state) => {
            state.currentId++;
            return state;
        });
    }

    buttonPrev() {
        this.setState((state) => {
            state.currentId--;
            return state;
        });
    }

    QuestionForm() {
        switch (this.state.test.questions[this.state.currentId].type) {
            case QuestionTypes.SINGLE_SELECT_QUESTION:
                return (
                    <SingleSelectQuestion parent={this} question={this.state.test.questions[this.state.currentId]}/>
                );
            case QuestionTypes.MULTIPLE_SELECT_QUESTION:
                return (
                    <MultipleSelectQuestion parent={this} question={this.state.test.questions[this.state.currentId]}/>
                );
            case QuestionTypes.WRITING_QUESTION:
                return (
                    <WritingQuestion parent={this} question={this.state.test.questions[this.state.currentId]}/>
                );
            default:
                return <div/>
        }
    }

    submit() {

        let attributes = new Map();
        attributes.set("stage", Stage.LOADING);

        this.props.setParentsState(attributes);

        axiosInstance.post("/test/id" + this.state.test.id + "/check", this.state.answers)
            .then(response => {
                let attributes = new Map();
                attributes.set("stage", Stage.TEST_COMPLETING.RESULTS);
                attributes.set("result", response.data);

                this.props.setParentsState(attributes);
            });

    }

    render() {
        return (
            <div style={{marginTop: "30px"}}>

                <form className={styles.uiForm}>
                    <div className={styles.textForm}>
                        <label className={styles.testName}>{this.state.test.name}</label>
                    </div>
                </form>

                <div className={styles.questionName}>{this.state.test.questions[this.state.currentId].text}</div>
                <this.QuestionForm/>

                <ButtonPrev this={this}/>
                <ButtonNext this={this}/>

                <ButtonSubmit this={this}/>
                <div className={styles.timer}>
                    <Timer minutes={this.state.test.duration} function={this.submit.bind(this)}/>
                </div>
            </div>);

    }
}

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {minutes: props.minutes, seconds: 0};
        this.tick = this.tick.bind(this);
    }

    tick() {
        let state = this.state;
        state.seconds--;
        if (state.seconds < 0) {
            state.seconds = 59;
            state.minutes--;
        }

        if (state.seconds === 0 && state.minutes === 0) {
            clearInterval(this.timer)
            this.props.function();
        }
        this.setState(state);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    render() {
        return (
            <div style={{position: "static"}}>
                <h3>{this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}
                    :
                    {this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}
                </h3>
            </div>
        );
    }
}