import React from "react";
import styles from "../SingleSelectQuestion/single_select.module.css";

export default class WritingAnswersList extends React.Component {

    MIN_ANSWERS_AMOUNT = 1;

    constructor(props) {
        super(props);
        this.View = this.View.bind(this);
    }

    View() {
        return this.props.answers.map((answer, index) =>
            this.props.answers.length > this.MIN_ANSWERS_AMOUNT ?
                <li key={answer.id}>
                    <SingleSelectAnswer answer={answer}
                                        index={index}
                                        answerTextHandler={this.props.answerTextHandler}
                                        answerRightHandler={this.props.answerRightHandler}/>
                    <button className={styles.remove} id={answer.id} onClick={(event) => this.props.removeAnswerHandler(event, index)}>

                    </button>
                </li>
                :
                <li key={answer["id"]}>
                    <SingleSelectAnswer answer={answer}
                                        index={index}
                                        answerTextHandler={this.props.answerTextHandler}
                                        answerRightHandler={this.props.answerRightHandler}/>
                    <button className={styles.remove} disabled={true}/>
                </li>
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
            <div className={styles.text}>
                <input  type="text" defaultValue={this.props.answer.text}
                       onChange={event => this.props.answerTextHandler(event, this.props.index)}/>
            </div>);
    }
}
