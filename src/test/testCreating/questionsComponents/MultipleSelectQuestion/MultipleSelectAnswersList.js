import React from "react";
import styles from "./multiple_select.module.css"

export default class MultipleSelectAnswersList extends React.Component {

    MIN_ANSWERS_AMOUNT = 2;

    constructor(props) {
        super(props);
        this.View = this.View.bind(this);
    }

    View() {
        return this.props.answers.map((answer, index) => {
                return this.props.answers.length > this.MIN_ANSWERS_AMOUNT ?
                    <li key={answer.id}>
                        <SingleSelectAnswer answer={answer}
                                            index={index}
                                            answerTextHandler={this.props.answerTextHandler}
                                            answerCheckHandler={this.props.answerCheckHandler}/>
                        <button className={styles.remove} id={answer.id}
                                onClick={(event) => this.props.removeAnswerHandler(event, index)}/>
                    </li>
                    :
                    <li key={answer["id"]}>
                        <SingleSelectAnswer answer={answer}
                                            index={index}
                                            answerTextHandler={this.props.answerTextHandler}
                                            answerCheckHandler={this.props.answerCheckHandler}/>
                        <button className={styles.remove} disabled={true}/>
                    </li>
            }
        );
    }

    render() {
        return (<ul style={{listStyleType: "none"}}>
            <this.View/>
        </ul>);
    }

}

class SingleSelectAnswer extends React.Component {

    render() {
        return (
            <div>
                <div className={styles.box}>
                    <input className={styles.checkbox} type="checkbox" id={"check" + this.props.index} name="checked"
                           checked={this.props.answer.isTrue ? "checked" : ""}
                           onChange={
                               (event) => {
                                   this.props.answerCheckHandler(event, this.props.index)
                               }
                           }/>
                    <label htmlFor={"check" + this.props.index}/>
                </div>
                <div className={styles.text}>
                    <input type="text" value={this.props.answer.text}
                           onChange={
                               event => this.props.answerTextHandler(event, this.props.index)
                           }/>
                </div>
            </div>);
    }
}
