import * as React from "react";
import {QuestionTypes} from "../config/QuestionsTypes";
import {ControlResults} from "../config/ControlResults";
import styles from "./results.module.css"

export class Answers extends React.Component {
    // constructor(props) {
    //     super(props);
    // }


    MultipleSelectAnswer(props) {
        switch (props.answer.controlResult) {
            case ControlResults.RIGHT_CHECKED:
                return (
                    <div className={styles.good}>
                        <div className={styles.box}>
                            <input className={styles.checkbox} type="checkbox" id={"check"} checked={true} disabled/>
                            <label className={styles.green} htmlFor={"check"}>{props.answer.text}</label>
                        </div>
                    </div>
                );
            case ControlResults.RIGHT_UNCHECKED:
                return (
                    <div className={styles.good}>
                        <div className={styles.box}>
                            <input className={styles.checkbox} type="checkbox" id={"check"} disabled/>
                            <label className={styles.green} htmlFor={"check"}>{props.answer.text}</label>
                        </div>
                    </div>
                );
            case ControlResults.WRONG_UNCHECKED:
                return (
                    <div className={styles.box}>
                        <input className={styles.checkbox} type="checkbox" id={"check"} disabled/>
                        <label htmlFor={"check"}>{props.answer.text}</label>

                    </div>
                );
            case ControlResults.WRONG_CHECKED:
                return (
                    <div className={styles.bad}>
                        <div className={styles.box}>

                            <input className={styles.checkbox} type="checkbox" id={"check"} checked={true} disabled/>
                            <label className={styles.red} htmlFor={"check"}>{props.answer.text}</label>
                        </div>
                    </div>
                );
            default: {
                return <div/>;
            }
        }
    }


    SingleSelectAnswer(props) {
        switch (props.answer.controlResult) {
            case ControlResults.RIGHT_CHECKED:
                return (
                    <div className={styles.good}>
                        <div className={styles.radio}>

                                <input id={"radio"} type="radio" checked={true} disabled/>

                                <label className={styles.green} htmlFor={"radio"}>{props.answer.text}</label>

                        </div>
                    </div>
                );
            case ControlResults.RIGHT_UNCHECKED:
                return (
                    <div className={styles.good}>
                        <div className={styles.radio}>
                            <input id={"radio"} type="radio"  disabled/>

                            <label className={styles.green} htmlFor={"radio"}>{props.answer.text}</label>
                        </div>
                    </div>
                );
            case ControlResults.WRONG_UNCHECKED:
                return (
                    <div className={styles.radio}>
                        <input id={"radio"} type="radio" disabled/>

                        <label htmlFor={"radio"}>{props.answer.text}</label>
                    </div>
                );
            case ControlResults.WRONG_CHECKED:
                return (
                    <div className={styles.bad}>
                        <div className={styles.radio}>
                            <input id={"radio"} type="radio" checked={true} disabled/>

                            <label className={styles.red} htmlFor={"radio"}>{props.answer.text}</label>
                        </div>
                    </div>
                );
            default: {
                return <div/>;
            }
        }

    }


    render() {
        switch (this.props.type) {
            case QuestionTypes.SINGLE_SELECT_QUESTION:
                return this.props.answers.map((answer, index) => {
                    return (
                        <li key={this.props.questionNumber * 30 + index}>
                            <this.SingleSelectAnswer answer={answer}/>
                        </li>
                    );
                })
            case QuestionTypes.MULTIPLE_SELECT_QUESTION:
                return this.props.answers.map((answer, index) => {
                    return (
                        <li key={this.props.questionNumber * 30 + index}>
                            <this.MultipleSelectAnswer answer={answer}/>
                        </li>
                    );
                })
            case QuestionTypes.WRITING_QUESTION:
                return this.props.answers.map((answer, index) => {
                    return (
                        <li key={this.props.questionNumber * 30 + index}>
                            <div>
                                <div className={styles.writeAnswer}>

                                        <div className={answer.controlResult === ControlResults.RIGHT_CHECKED
                                            ? styles.good : styles.green}>{answer.text}</div>


                                </div>
                            </div>


                        </li>
                    );
                })
            default:
                return <div/>
        }

    }
}