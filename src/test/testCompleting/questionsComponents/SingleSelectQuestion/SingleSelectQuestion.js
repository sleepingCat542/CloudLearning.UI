import React from 'react';
import SingleSelectAnswersList from "./SingleSelectAnswersList";

export default class SingleSelectQuestion extends React.Component {


    constructor(props) {
        super(props);
        this.answerCheckHandler = this.answerCheckHandler.bind(this.props.parent);
    }

    answerCheckHandler(event, answerId, systemAnswerId) {
        let state = this.state;
        let question = this.state.test.questions[this.state.currentId];

        const questionId = question.id;

        question.answers.forEach(answer => answer.isChecked = false)
        question.answers[answerId].isChecked
            = !question.answers[answerId].isChecked;

        state.answers[questionId] = systemAnswerId;

        this.setState(state);
    }


    render() {
        return (
            <div>
                <SingleSelectAnswersList answers={this.props.question.answers}
                                         answerCheckHandler={this.answerCheckHandler}/>
            </div>
        );
    }
}
