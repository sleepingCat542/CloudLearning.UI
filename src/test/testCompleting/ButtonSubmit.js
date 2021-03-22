import * as React from "react";
import styles from "./testCompleting.module.css"

export default class ButtonSubmit extends React.Component {


    checkAllAnswered(){

    }

    render() {
        return (
            <div className={styles.save}>
                <button className={styles.circleButton} onClick={this.props.this.submit.bind(this.props.this)}>Save</button>
            </div>
        );
    }
}