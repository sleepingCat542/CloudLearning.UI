import React from 'react';
import styles from "./writing_question_answer.module.css";

export default class WritingQuestion extends React.Component {


    constructor(props) {
        super(props);
        this.answerTextHandler = this.answerTextHandler.bind(this.props.parent);
    }

    answerTextHandler(event) {
        let state = this.state;
        const questionId = state.test.questions[state.currentId].id;
        const value = event.target.value;

        state.test.questions[state.currentId].answer = event.target.value;

        if (value !== "") {
            state.answers[questionId] = value;
        } else {
            state.answers[questionId] = null;
        }

        this.setState(state);
    }


    render() {
        return (
            <div>
                <div className={styles.text}>
                    <input type="text" value={this.props.question.answer}
                           onChange={event => this.answerTextHandler(event)}/>
                </div>
            </div>
        );
    }
}
