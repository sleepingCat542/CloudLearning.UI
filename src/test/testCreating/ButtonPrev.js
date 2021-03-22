import React from "react";
import styles from "./testCreating.module.css"

export default function ButtonPrev(props) {
    if (props.this.state.currentId !== 0) {
        return (
            <div className={styles.prev}>
                <button className={styles.button} onClick={props.this.buttonPrev}>Previous</button>
            </div>
        )
    } else {
        return (
            <div className={styles.prev}>
                <button className={styles.button} disabled="disabled">Previous</button>
            </div>
        )
    }

}