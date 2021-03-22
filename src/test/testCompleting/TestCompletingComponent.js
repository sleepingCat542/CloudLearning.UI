import * as React from "react";
import axiosInstance from "../../util/AxiosInstance";
import TestCompleteWindow from "./TestCompleteWindow";
import {Redirect} from "react-router-dom";
import {Stage} from "../../config/stages";
import styles from "./testCompleting.module.css";


export class TestCompletingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {test: null, stage: Stage.LOADING};
        this.getTestInfo = this.getTestInfo.bind(this);

    }

    setStateAttribute(attributesMap) {
        this.setState((state) => {
            for (let [key, value] of attributesMap) {
                state[key] = value;
            }
            return state;
        });
    }

    componentDidMount() {
        this.getTestInfo();
    }

    getTestInfo() {
        axiosInstance.get("/test/id" + this.props.match.params.id + "/get_test_info").then(response => {
            let test = response.data;
            this.setState({stage: Stage.TEST_COMPLETING.PREVIEW, test: test});
        })
    }

    getTest() {
        axiosInstance.get("/test/id" + this.props.match.params.id + "/get").then(response => {
            let test = response.data;
            this.setState({stage: Stage.TEST_COMPLETING.IN_PROGRESS, test: test});
        })
    }

    render() {
        console.log(this.state.stage);
        switch (this.state.stage) {
            case Stage.TEST_COMPLETING.PREVIEW:
                return (
                    <div className={styles.form1}>

                        <form className={styles.uiForm}>
                            <div className={styles.textForm}>
                                <label className={styles.testName}>{this.state.test.name}</label>
                            </div>
                        </form>


                        <form className={styles.uiForm}>
                            <div className={styles.textForm}>
                                <label className={styles.description}>{this.state.test.description}</label>
                            </div>
                        </form>


                        <div className={styles.duration}>{this.state.test.duration} minutes</div>
                        <button className={styles.start} onClick={this.getTest.bind(this)}>
                            Start test
                        </button>
                    </div>
                );
            case Stage.TEST_COMPLETING.IN_PROGRESS:
                return (
                    <div>
                        <div className={styles.form1}>
                            <TestCompleteWindow test={this.state.test}
                                                setParentsState={this.setStateAttribute.bind(this)}/>
                        </div>

                    </div>
                );
            case Stage.TEST_COMPLETING.RESULTS:
                return (
                    <div>
                        <div className={styles.form1}>
                            <Redirect to={"/test/result/id" + this.state.result}/>
                        </div>

                    </div>
                )
            case Stage.LOADING:
                return (
                    <div className={styles.form1}>
                        LOADING...
                    </div>
                )
            default:
                return (
                    <div>

                    </div>
                )
        }

    }
}