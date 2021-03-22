import React from "react";
import styles from "./single_select_answer.module.css";

export default class SingleSelectAnswersList extends React.Component {

    constructor(props) {
        super(props);
        this.View = this.View.bind(this);
    }

    View() {
        return this.props.answers.map((answer, index) =>
            <ul key={answer.id}>
                <SingleSelectAnswer answer={answer}
                                    index={index}
                                    answerCheckHandler={this.props.answerCheckHandler}/>
            </ul>
        );
    }

    render() {
        return (<ul>
            <this.View/>
        </ul>);
    }

}

class SingleSelectAnswer extends React.Component {

    render() {
        return (
            <div className={styles.radio}>
                <input id={"radio" + this.props.index} type="radio" name="checked"
                       checked={this.props.answer.isChecked}
                       onChange={event => {
                           this.props.answerCheckHandler(event, this.props.index, this.props.answer.id)
                       }}/>
                <label htmlFor={"radio" + this.props.index}> {this.props.answer.text} </label>
            </div>);
    }
}
