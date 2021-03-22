import React from "react";
import styles from "./multiple_select_answer.module.css"

export default class MultipleSelectAnswersList extends React.Component {

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
        return (<div>
            <this.View/>
        </div>);
    }

}

class SingleSelectAnswer extends React.Component {

    render() {
        return (
            <div>
                <div className={styles.box}>
                    <input className={styles.checkbox} type="checkbox" id={"check" + this.props.index} name="checked"
                           checked={this.props.answer.isChecked}
                           onChange={event => {
                               this.props.answerCheckHandler(event, this.props.index, this.props.answer.id)
                           }}/>
                    <label htmlFor={"check" + this.props.index}/>
                </div>

                <div className={styles.text}>
                    <input type="text" defaultValue={this.props.answer.text} disabled={true}
                           onChange={event => this.props.answerTextHandler(event, this.props.index)}/>
                </div>

            </div>);
    }
}
