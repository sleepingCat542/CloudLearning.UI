import * as React from "react";
import styles from "./testCreating.module.css";

export default class ButtonRemove extends React.Component {

    render() {
        if (this.props.amount > 1)
            return (
                <div className={styles.rem}>
                    <button className={styles.button} onClick={this.props.removeQuestion}>Remove question</button>
                </div>
            ); else
            return (
                <div className={styles.rem}>
                    <button className={styles.button} disabled>Remove question</button>
                </div>
            );
    }
}