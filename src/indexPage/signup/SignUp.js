import * as React from "react";

import styles from "./sign_up.module.css"
import globalStyles from "../style.module.css"
import cx from "classnames"
import VelocityComponent from "velocity-react/velocity-component"
import axiosInstance from "../../util/AxiosInstance";
import {Stage} from "../../config/stages";
import {Link} from "react-router-dom";
import config from "../../config";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.Content = this.Content.bind(this);
        this.SignUpButton = this.SignUpButton.bind(this);
        this.UsernameError = this.UsernameError.bind(this);
        this.EmailError = this.EmailError.bind(this);
        this.PasswordMatchError = this.PasswordMatchError.bind(this);
        this.MailConfirmation = this.MailConfirmation.bind(this);
        this.PasswordEasyError = this.PasswordEasyError.bind(this);
        this.state = {
            stage: Stage.SIGN_UP.FORM, errors: {
                usernameExist: false,
                emailExist: false,
                passwordEasy: false,
                emailInvalid: false,
                passwordsNotMatches: false,
            }, user: {
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirmation: "",
                confirmationUrl: config.confirmationUrl
            }
        };
    }


    Overlay() {
        return (
            <VelocityComponent animation={{

                translateX: "100%",
                opacity: "1",
            }} duration={1000} runOnMount={true}>

                <div className={styles.signUpOverlay}>
                    <div className={cx(styles.signUpOverlay2, "skew-part")}>

                        <div className={globalStyles.stars}/>
                        <div className={globalStyles.stars2}/>
                        <div className={globalStyles.stars3}/>

                    </div>
                </div>
            </VelocityComponent>
        );
    }

    submit() {
        let state = this.state;
        state.stage = Stage.LOADING;
        this.setState(state);

        axiosInstance.post("/sign_up", this.state.user).then(
            (response) => {
                let data = response.data;
                let state = this.state;

                if (data.hasErrors) {
                    state.errors = data.errorsInfo;
                    state.stage = Stage.SIGN_UP.FORM;
                } else {
                    state.stage = Stage.SIGN_UP.SUCCESS;
                }
                this.setState(state);
            }
        ).catch(
            () => {
                let state = this.state;
                state.stage = Stage.SIGN_UP.FORM;
                this.setState(state);
            }
        );

    }


    UsernameError() {
        console.log(this.state.errors.usernameExist);

        if (this.state.errors.usernameExist) {
            return (
                <div id="username_exist_error" className={styles.errorForm}>
                    <label className={cx(styles.input, styles.usernameError)}>Username exist</label>
                </div>

            );
        } else {
            return <div/>
        }
    }

    EmailError() {

        if (this.state.errors.emailExist) {
            return (
                <div className={styles.errorForm}>
                    <label className={cx(styles.input, styles.emailError)}>Email already exist. Do you want to
                        <Link to="/login"> login</Link> to your account?</label>
                </div>
            );
        } else if (this.state.errors.emailInvalid) {
            return (
                <div className={styles.errorForm}>
                    <label className={cx("text", styles.emailError)}>Please, enter correct email.</label>
                </div>
            );
        } else {
            return <div/>
        }
    }

    PasswordMatchError() {

        if (this.state.errors.passwordsNotMatches) {
            return (
                <div id="password_matches_error" className={styles.errorForm}>
                    <label className={cx("text", styles.passwordMatchError)}>Passwords doesn't match.</label>

                </div>
            );
        } else {
            return <div/>
        }

    }

    PasswordEasyError() {
        if (this.state.errors.passwordEasy) {
            return (
                <div className={styles.errorForm}>

                    <label className={cx("text", styles.passwordEasyError)}>Password must contains at least 8 symbols,
                        capital letters and numbers.</label>
                </div>
            );
        } else {
            return <div/>
        }

    }


    Content() {
        return (
            <VelocityComponent animation={{
                opacity: "1",
            }} runOnMount={true} duration={1000} delay={1000}>
                {/*<section style={{opacity: 0}}>*/}
                <section className={cx("center-side", styles.signUpContent)}>

                    <a className={styles.a} href="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt=""
                                                          className={styles.brandLogoSignUp}/></a>


                    <div className={styles.signUpForm}>
                        <form action="" className={styles.uiForm}>


                            <div className={styles.textForm}>
                                <input id="userName" className={cx(styles.input, styles.l1)} required="required"
                                       onChange={event => {
                                           let state = this.state;
                                           state.user.username = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="userName">Username</label>
                            </div>
                            <this.UsernameError/>

                            <div className={styles.textForm}>
                                <input id="firstName" className={cx(styles.input, styles.l1)} required="required"
                                       onChange={event => {
                                           let state = this.state;
                                           state.user.firstName = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="firstName">First name</label>
                            </div>

                            <div className={styles.textForm}>
                                <input id="lastName" className={cx(styles.input, styles.l1)} required="required"
                                       onChange={event => {
                                           let state = this.state;
                                           state.user.lastName = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="lastName">Last name</label>
                            </div>

                            <div className={styles.textForm}>
                                <input id="groupNumber" className={cx(styles.input, styles.l1)} required="required"
                                       onChange={event => {
                                           let state = this.state;
                                           state.user.group = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="groupNumber">Group</label>
                            </div>

                            <div className={styles.textForm}>
                                <input id="email" className={cx(styles.input, styles.l1)} required="required"
                                       onChange={event => {
                                           let state = this.state;
                                           state.user.email = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="email">E-mail</label>
                            </div>
                            <this.EmailError/>

                            <div className={styles.textForm}>
                                <input id="password" type="password" className={cx(styles.input, styles.l1)}
                                       required="required"
                                       onChange={event => {
                                           let state = this.state;
                                           state.user.password = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="password">Password</label>

                            </div>
                            <this.PasswordEasyError/>

                            <div className={styles.textForm}>
                                <input id="confirmPassword" type="password" className={cx(styles.input, styles.l1)}
                                       required="required"
                                       onChange={event => {
                                           let state = this.state;
                                           state.user.passwordConfirmation = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="confirmPassword">Confirm password</label>

                            </div>
                            <this.PasswordMatchError/>

                            <this.SignUpButton/>


                        </form>

                    </div>


                </section>
            </VelocityComponent>
        );
    }

    SignUpButton() {
        if (this.state.user.username.length === 0 || this.state.user.firstName.length === 0 ||
            this.state.user.lastName.length === 0 || this.state.user.email.length === 0 ||
            this.state.user.password.length === 0 || this.state.user.passwordConfirmation.length === 0 ||
            this.state.stage === Stage.LOADING) {
            return (
                <h1>
                    <button type="button" className={styles.disabledSignUp} disabled={true}>Sign up</button>
                </h1>);
        } else {
            return (
                <h1>
                    <button type="button" className={styles.signUp} onClick={this.submit}>Sign up</button>
                </h1>);
        }
    }


    MailConfirmation() {
        return (
            <div className={styles.confirmationForm}>
                <confirm>A confirmation code has been sent to the mail</confirm>
                <mail>{this.state.user.email}</mail>
                <h1>
                    <Link to={"/login"}><button className={styles.ok}>Okay</button></Link>
                </h1>
            </div>
        );
    }

    render() {
        switch (this.state.stage) {
            case Stage.LOADING:
            case Stage.SIGN_UP.FORM:
                return (
                    <div className={styles.signUpBody}>
                        <this.Overlay/>
                        <this.Content/>

                    </div>
                );
            case Stage.SIGN_UP.SUCCESS:
                return (
                    <div className={styles.signUpBody}>
                        <this.Overlay/>
                        <this.MailConfirmation/>
                    </div>
                );
            default:
                return (
                    <div>ERROR</div>
                );
        }

    }
}


export default SignUp;