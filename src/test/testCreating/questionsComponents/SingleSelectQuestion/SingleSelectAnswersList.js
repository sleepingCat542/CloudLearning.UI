import React from "react";
import styles from "./single_select.module.css"

export default class SingleSelectAnswersList extends React.Component {

    MIN_ANSWERS_AMOUNT = 2;

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
                                        answerCheckHandler={this.props.answerCheckHandler}/>
                    <button className={styles.remove} id={answer.id} onClick={(event) => this.props.removeAnswerHandler(event, index)}>

                    </button>
                </li>
                :
                <li key={answer["id"]}>
                    <SingleSelectAnswer answer={answer}
                                        index={index}
                                        answerTextHandler={this.props.answerTextHandler}
                                        answerCheckHandler={this.props.answerCheckHandler}/>
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
            <div >
                <div className={styles.radio}>


                    <input type="radio" id={"radio" + this.props.index} name="checked"
                           defaultChecked={this.props.answer.isTrue ? "checked" : ""}
                           onChange={event => {
                               this.props.answerCheckHandler(event, this.props.index)
                           }}>
                    </input>
                    <label htmlFor={"radio" + this.props.index}/>
                </div>

                    <div className={styles.text}>
                        <input className={styles.r4} type="text" defaultValue={this.props.answer.text}
    onChange={event => this.props.answerTextHandler(event, this.props.index)}/>
                    </div>


            </div>);
    }
}
