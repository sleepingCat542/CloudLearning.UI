import React from "react";
import SingleSelectQuestion from "./questionsComponents/SingleSelectQuestion/SingleSelectQuestion";
import ButtonNext from "./ButtonNext";
import ButtonPrev from "./ButtonPrev";
import MultipleSelectQuestion from "./questionsComponents/MultipleSelectQuestion/MultipleSelectQuestion";
import WritingQuestion from "./questionsComponents/WritingQuestion/WritingQuestion";
import ButtonRemove from "./ButtonRemove";
import axiosInstance from "../../util/AxiosInstance";
import styles from "./testCreating.module.css"
import {QuestionTypes} from "../../config/QuestionsTypes";
import {Stage} from "../../config/stages";
import {Redirect} from "react-router-dom";


export default class TestCreateWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: Stage.TEST_CREATING.CREATING,
            gotoId: 0,
            test: {
                questions: [{
                    id: 0,
                    text: "",
                    type: QuestionTypes.SINGLE_SELECT_QUESTION,
                    answers: [],
                }],
                description: "",
                name: "",
                duration: 10,
                subjectId: this.props.match.params.subjectId
            },
            currentId: 0,
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.buttonPrev = this.buttonPrev.bind(this);
        this.buttonNext = this.buttonNext.bind(this);
        this.QuestionForm = this.QuestionForm.bind(this);
        this.changeQuestionType = this.changeQuestionType.bind(this);
        this.questionTextHandler = this.questionTextHandler.bind(this);
        this.removeAnswerHandler = this.removeAnswerHandler.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.durationChangeHandler = this.durationChangeHandler.bind(this);
        this.QuestionNumber = this.QuestionNumber.bind(this);
        this.onGoTo = this.onGoTo.bind(this);
        this.TestForm = this.TestForm.bind(this);
    }

    maxId = -1;

    questionTextHandler(event) {
        let state = this.state;
        state.test.questions[this.state.currentId].text = event.target.value;
        this.setState(state);
    }

    addQuestion() {
        let state = this.state;
        state.currentId++;
        state.gotoId++;
        state.test.questions.push({
            text: "",
            id: this.state.currentId,
            type: QuestionTypes.SINGLE_SELECT_QUESTION,
            answers: [],
        });
        this.setState(state);
    }

    removeAnswerHandler(event, id) {
        this.state.test.questions[this.state.currentId].answers.splice(id, 1);
        this.forceUpdate();
    }

    removeQuestion() {
        let state = this.state;
        state.test.questions.splice(this.state.currentId, 1);
        if (state.currentId === state.test.questions.length) {
            state.currentId--;
            state.gotoId--;
        }
        this.setState(state);
    }

    buttonNext() {
        let state = this.state;
        state.currentId++;
        state.gotoId++;
        this.setState(state);
    }

    buttonPrev() {
        let state = this.state;
        state.currentId--;
        state.gotoId--;
        this.setState(state);
    }

    QuestionForm() {
        switch (this.state.test.questions[this.state.currentId].type) {
            case QuestionTypes.SINGLE_SELECT_QUESTION:
                return (
                    <SingleSelectQuestion parent={this} question={this.state.test.questions[this.state.currentId]}/>
                );
            case QuestionTypes.MULTIPLE_SELECT_QUESTION:
                return (
                    <MultipleSelectQuestion parent={this} question={this.state.test.questions[this.state.currentId]}/>
                );
            case QuestionTypes.WRITING_QUESTION:
                return (
                    <WritingQuestion parent={this} question={this.state.test.questions[this.state.currentId]}/>
                );
            case QuestionTypes.ORDER_QUESTION:
                return null;
            default:
                return <div>Test</div>
        }
    }

    changeQuestionType(type) {
        let state = this.state;
        state.test.questions[this.state.currentId].type = type;
        this.setState(state);
    };

    submit(event) {
        event.preventDefault();
        console.log(this.state.test);
        axiosInstance.put("/test/create",
            this.state.test
        ).then(() => {
            this.setState((state) => {
                state.stage = Stage.TEST_CREATING.REDIRECT;
                return state;
            });
        }).catch(
            (error) => {

                this.setState((prevState) => {
                    prevState.stage = Stage.TEST_CREATING.ERROR;
                    prevState.error = error.response.data.message;
                    return prevState;
                });
            }
        );
    }

    durationChangeHandler(event) {
        if (event.target.value.length === 0
            || parseInt(event.target.value) < 1
            || parseInt(event.target.value) > 60 * 5) {
            return;
        }
        if ("1234567890".indexOf(event.target.value[event.target.value.length - 1]) !== -1) {
            let state = this.state;
            state.test.duration = parseInt(event.target.value);
            this.setState(state);
        }
    }

    onQuestionNumberChange(event) {
        let state = this.state;
        event.preventDefault();
        if (event.target.value === "") {
            state.gotoId = "";
        } else if ("1234567890".indexOf(event.target.value[event.target.value.length - 1]) === -1) {
            event.target.value = event.target.value.slice(0, event.target.value.length - 1);
        } else if (event.target.value >= 0) {
            state.gotoId = parseInt(event.target.value) - 1;
        } else {
            state.gotoId = 0;
        }
        this.setState(state);
    }

    QuestionNumber() {
        return (<input type="text" value={this.state.gotoId === "" ? "" : this.state.gotoId + 1}
                       onChange={this.onQuestionNumberChange.bind(this)}
                       onBlur={this.onGoTo}
                       onKeyPress={
                           (event) => {
                               if (event.charCode === 13) {
                                   this.onGoTo();
                               }
                           }
                       }/>
        )
    }


    onGoTo() {
        let state = this.state;
        let number = state.gotoId;
        let questionsAmount = this.state.test.questions.length;
        if (number > questionsAmount) {
            number = questionsAmount - 1;
        } else if (number < 0) {
            number = 0;
        } else if (number === "") {
            number = 0;
        }
        state.currentId = number;
        state.gotoId = number;
        this.setState(state);
    }


    TestForm() {
        return (
            <div style={{marginTop: "30px"}}>
                <div className={styles.form}>
                    <form action="" className={styles.uiForm}>
                        <div className={styles.textForm}>
                            <input id="name" value={this.state.test.name} className={styles.h1} type="text"
                                   required autoComplete="off" onChange={
                                (event) => {
                                    let state = this.state;
                                    state.test.name = event.target.value;
                                    this.setState(state);
                                }
                            }/>
                            <label className={styles.h1} htmlFor="name">Test name</label>
                        </div>
                    </form>
                    <form action="" className={styles.uiForm}>
                        <div className={styles.textForm}>
                            <input id="description" value={this.state.test.description} className={styles.h1}
                                   type="text" required autoComplete="off" onChange={
                                (event) => {
                                    let state = this.state;
                                    state.test.description = event.target.value;
                                    this.setState(state);
                                }
                            }/>
                            <label className={styles.h1} htmlFor="description">Test description</label>
                        </div>
                    </form>


                    <form action="" className={styles.uiForm}>
                        <div className={styles.textForm}>
                            <input className={styles.h1} type="number" value={this.state.test.duration}
                                   onChange={event => this.durationChangeHandler(event)}/>
                            <label className={styles.h1} htmlFor="duration">Test duration (minutes)</label>
                            <h1>
                                <button className={styles.save} onClick={this.submit.bind(this)}>Save</button>
                            </h1>
                        </div>
                    </form>

                </div>


                <div className={styles.form3}>
                    <div className={styles.questionNumber}>
                        Question <this.QuestionNumber/>/ {this.state.test.questions.length}
                    </div>

                    <form action="" className={styles.uiForm}>

                        <div className={styles.textForm}>
                            <input id="question" value={this.state.test.questions[this.state.currentId].text}
                                   className={styles.h1} type="text" autoComplete="off" onChange={
                                (event) => {
                                    let state = this.state;
                                    state.test.questions[this.state.currentId].text = event.target.value;
                                    this.setState(state);
                                }
                            }/>
                            <label className={styles.h1} htmlFor="question">Question text</label>
                        </div>
                    </form>

                    <div className={styles.radio}>
                        <input type="radio" id="r1" name="questionType"
                               onChange={() => this.changeQuestionType(QuestionTypes.SINGLE_SELECT_QUESTION)}
                               checked={this.state.test.questions[this.state.currentId].type === QuestionTypes.SINGLE_SELECT_QUESTION}>
                        </input>
                        <label htmlFor="r1" className={styles.r1}>Single select question</label>

                        <input type="radio" id="r2" name="questionType"
                               onChange={() => this.changeQuestionType(QuestionTypes.MULTIPLE_SELECT_QUESTION)}
                               checked={this.state.test.questions[this.state.currentId].type === QuestionTypes.MULTIPLE_SELECT_QUESTION}>
                        </input>
                        <label htmlFor="r2" className={styles.r2}>Multiple select question</label>

                        <input type="radio" id="r3" name="questionType"
                               onChange={() => this.changeQuestionType(QuestionTypes.WRITING_QUESTION)}
                               checked={this.state.test.questions[this.state.currentId].type === QuestionTypes.WRITING_QUESTION}>
                        </input>
                        <label htmlFor="r3" className={styles.r3}>Write question</label>

                    </div>
                    <ButtonPrev this={this}/>
                    <ButtonNext this={this}/>

                    <ButtonRemove amount={this.state.test.questions.length}
                                  removeQuestion={this.removeQuestion.bind(this)}/>
                </div>
                <div className={styles.form2}>
                    <this.QuestionForm/>

                </div>


            </div>
        );
    }

    render() {
        switch (this.state.stage) {
            case Stage.TEST_CREATING.CREATING:
                return (
                    <this.TestForm/>
                );
            case Stage.TEST_CREATING.REDIRECT:
                return (
                    <Redirect to={"/subject/id" + this.props.match.params.subjectId}/>
                );
            case Stage.TEST_CREATING.ERROR:
                return (
                    <div>
                        <h3>{this.state.error}</h3>
                        <this.TestForm/>
                    </div>
                );
            default:
                return (<div>Error</div>);
        }

    }
}
