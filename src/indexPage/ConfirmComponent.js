import * as React from "react";
import {Stage} from "../config/stages";
import {Redirect} from "react-router-dom";
import axiosInstance from "../util/AxiosInstance";

export class ConfirmComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stage: Stage.LOADING, error: ""}
    }

    componentDidMount() {
        axiosInstance.post("confirm/" + this.props.match.params.confirmUid).then(
            () => {
                this.setState({stage: Stage.CONFIRM.SUCCESS});
            }
        ).catch(
            (error) => {
                if (error.response === undefined) {console.log(error)} else
                this.setState({error: error.response.data.message, stage: Stage.CONFIRM.ERROR})
            }
        );
    }

    render() {
        switch (this.state.stage) {
            case Stage.LOADING:
                return (<div>LOADING</div>);
            case Stage.CONFIRM.SUCCESS:
                return (<Redirect to={"/login"}/>);
            case Stage.CONFIRM.ERROR:
                return (<div>{this.state.error}</div>)
            default:
                return <div>Error</div>
        }
    }
}