import React from 'react';
import MultipleSelectAnswersList from "./MultipleSelectAnswersList";

export default class MultipleSelectQuestion extends React.Component {


    constructor(props) {
        super(props);
        this.answerCheckHandler = this.answerCheckHandler.bind(this.props.parent);
    }

    answerCheckHandler(event, answerId, systemAnswerId) {
        let state = this.state;
        let question = state.test.questions[this.state.currentId];
        question.answers[answerId].isChecked
            = !question.answers[answerId].isChecked;


        const questionId = state.test.questions[state.currentId].id;

        let answers = state.answers[questionId];

        let findPos = answers.indexOf(systemAnswerId);
        if (findPos !== -1) {
            answers.splice(findPos, 1);
        } else {
            answers.push(systemAnswerId);
        }

        this.setState(state);
    }


    render() {
        return (
            <div>
                <MultipleSelectAnswersList answers={this.props.question.answers}
                                           answerCheckHandler={this.answerCheckHandler}/>
            </div>
        );
    }
}
