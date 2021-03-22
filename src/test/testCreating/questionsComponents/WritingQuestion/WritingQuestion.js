import React from 'react';
import WritingAnswersList from "./WritingAnswersList";
import styles from "./writing_question.module.css"


export default class WritingQuestion extends React.Component {


    MAX_ANSWERS_AMOUNT = 8;
    DEFAULT_ANSWERS_AMOUNT = 2;

    constructor(props) {
        super(props);
        this.addAnswer = this.addAnswer.bind(this);
        this.fillDefault = this.fillDefault.bind(this);
        this.answerTextHandler = this.answerTextHandler.bind(this.props.parent);
        this.ButtonAddAnswer = this.ButtonAddAnswer.bind(this);
    }

    fillDefault() {
        for (let i = 0; i < this.DEFAULT_ANSWERS_AMOUNT; i++) {
            this.props.question.answers.push({id: ++this.props.parent.maxId, text: ""});
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
                <WritingAnswersList answers={this.props.question.answers}
                                    removeAnswerHandler={this.props.parent.removeAnswerHandler}
                                    answerTextHandler={this.answerTextHandler}
                                    answerRightHandler={this.answerCheckHandler}/>

                <this.ButtonAddAnswer/>
            </div>
        );
    }
}
