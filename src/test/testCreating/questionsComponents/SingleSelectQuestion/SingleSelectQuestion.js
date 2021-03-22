import React from 'react';
import SingleSelectAnswersList from "./SingleSelectAnswersList";
import styles from "./single_select.module.css"

export default class SingleSelectQuestion extends React.Component {

    MAX_ANSWERS_AMOUNT = 8;
    DEFAULT_ANSWERS_AMOUNT = 4;

    constructor(props) {
        super(props);
        this.addAnswer = this.addAnswer.bind(this);
        this.fillDefault = this.fillDefault.bind(this);
        this.answerCheckHandler = this.answerCheckHandler.bind(this.props.parent);
        this.answerTextHandler = this.answerTextHandler.bind(this.props.parent);
        this.ButtonAddAnswer = this.ButtonAddAnswer.bind(this);
    }

    fillDefault() {
        for (let i = 0; i < this.DEFAULT_ANSWERS_AMOUNT; i++) {
            this.props.question.answers.push({id: ++this.props.parent.maxId, text: "", isTrue: false});
        }
    }

    addAnswer() {
        let answersAmount = this.props.question.answers.length;
        if (answersAmount < this.MAX_ANSWERS_AMOUNT) {
            this.props.question.answers.push({id: ++this.props.parent.maxId, text: "", isTrue: false});
        }
        this.forceUpdate();
    }

    answerTextHandler(event, answerId) {
        let state = this.state;
        state.test.questions[this.state.currentId].answers[answerId].text = event.target.value;
        this.setState(state);
    }

    answerCheckHandler(event, answerId) {
        let state = this.state;
        this.state.test.questions[this.state.currentId].answers.forEach(answer => answer.isTrue = false)
        state.test.questions[this.state.currentId].answers[answerId].isTrue
            = !state.test.questions[this.state.currentId].answers[answerId].isTrue;
        this.setState(state);
    }


    ButtonAddAnswer(){
        let answersAmount = this.props.question.answers.length;
        if (answersAmount < this.MAX_ANSWERS_AMOUNT) {
            return (<button className={styles.addAnswer} onClick={this.addAnswer}><h1>Add answer</h1></button>)
        }
        else
            return(<div/>)

    }

    render() {
        if (this.props.question.answers.length === 0) {
            this.fillDefault();
        }
        return (
            <div>
                <SingleSelectAnswersList answers={this.props.question.answers}
                                         removeAnswerHandler={this.props.parent.removeAnswerHandler}
                                         answerTextHandler={this.answerTextHandler}
                                         answerCheckHandler={this.answerCheckHandler}/>
                <this.ButtonAddAnswer/>
            </div>
        );
    }
}
