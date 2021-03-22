import React from "react";
import styles from "./testCreating.module.css"

export default function ButtonNext(props) {
    let currentId = props.this.state.currentId;
    if (Number.parseInt(currentId) !== props.this.state.test.questions.length - 1) {
        return (
            <div className={styles.add}>
                <button className={styles.button} onClick={props.this.buttonNext}>Next</button>
            </div>
        )
    } else {
        return (
            <div className={styles.add}>
                <button className={styles.button} onClick={props.this.addQuestion}>Add</button>
            </div>
        )
    }
}

