import React from "react";
import styles from "./testCompleting.module.css"
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
                <button className={styles.button} style={{visibility: "hidden"}}>Previous</button>
            </div>
        )
    }

}