import * as React from "react";
import {Answers} from "./Answers";
import styles from "./results.module.css"

export class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.questionCounter = -1;
    }

    render() {
        return (
            this.props.questions.map(
                (question) => {
                    this.questionCounter++;
                    return (
                        <li key={this.questionCounter}>
                            <div className={styles.questionText}>
                                {question.text}
                            </div>
                            <ul>
                                <Answers questionNumber={this.questionCounter} type={question.type} answers={question.answers}/>
                            </ul>
                        </li>
                    );
                }
            )
        );
    }
}