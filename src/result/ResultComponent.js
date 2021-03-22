import * as React from "react";
import {Stage} from "../config/stages";
import axiosInstance from "../util/AxiosInstance";
import {Questions} from "./Questions";
import styles from "./results.module.css"

export class ResultComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stage: Stage.LOADING, result: ""}
    }

    componentDidMount() {
        axiosInstance.get("test/result/id" + this.props.match.params.id).then(
            (response) => {
                let state = this.state;
                state.result = response.data;
                state.stage = Stage.RESULTS.WATCH_RESULTS;
                this.setState(state);
                console.log(response);
            }
        );
    }

    render() {
        console.log("Test");

        switch (this.state.stage) {
            case Stage.LOADING:
                return (
                    <div>
                        LOADING...
                    </div>
                );
            case Stage.RESULTS.WATCH_RESULTS:
                return (
                    <div className={styles.resultForm}>
                        <div className={styles.date}>Completion date: {this.state.result.date} {this.state.result.time}</div>
                        <hr/>

                        <form action="" className={styles.uiForm}>
                            <div className={styles.textForm}>
                                <div>{this.state.result.testName}</div>
                                <label>Test name</label>
                            </div>
                        </form>
                        <ul>
                            <Questions questions={this.state.result.questions}/>
                        </ul>
                    </div>
                );
            default:
                return (
                    <div>
                        ERROR: Wrong state!
                    </div>
                );
        }

    }

}