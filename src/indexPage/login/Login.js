import * as React from "react";
import styles from "./login.module.css"
import cx from "classnames"

import VelocityComponent from "velocity-react/velocity-component"
import globalStyles from "../style.module.css";

import Redirect from "react-router-dom/es/Redirect";
import AuthService from "../../util/AuthServise";
import {Stage} from "../../config/stages";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {username: "", password: "", rememberMe: false, error: "", success: false}
        this.LoginContent = this.LoginContent.bind(this);
        this.PasswordRecovery = this.PasswordRecovery.bind(this);
        this.NewPassword = this.NewPassword.bind(this);
        this.state = {
            stage: Stage.LOGIN.FORM,
            errors: {
                usernameExist: false,
                emailExist: false,
                passwordEasy: false,
                emailInvalid: false,
                passwordsNotMatches: false,
            },
            user: {
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordMatches: "",
            }
        };
    }

    errorSetter(error) {
        let state = this.state;
        state.error = error;

        if (error === "") {
            state.success = true;
        }

        this.setState(state);
    }

    submit(event) {
        event.preventDefault();
        AuthService.authRequest(this.state.username, this.state.password, this.errorSetter.bind(this));
    }

    PasswordRecovery() {
        return (
            <div className={styles.passwordRecoveryForm}>
                <confirm>A recovery code has been sent to the mail</confirm>
                <mail>{this.state.user.email}</mail>
                <h1>
                    <button className={styles.ok}>Okay</button>
                </h1>
            </div>
        );
    }

    NewPassword() {
        return (
            <div className={styles.passwordRecoveryForm}>
                <form action="" className={styles.uiForm}>
                    <div className={styles.textForm}>
                        <input id="password" type="password" className={cx(styles.input, styles.l1)} onChange={
                            event => {
                                let state = this.state;
                                state.user.password = event.target.value;
                                this.setState(state)
                            }}/>
                        <label className={styles.l1} htmlFor="password">Password</label>

                    </div>

                    <div className={styles.textForm}>
                        <input id="confirmPassword" type="password" className={cx(styles.input, styles.l1)} onChange={
                            event => {
                                let state = this.state;
                                state.user.passwordMatches = event.target.value;
                                this.setState(state)
                            }}/>
                        <label className={styles.l1} htmlFor="confirmPassword">Confirm password</label>

                    </div>

                </form>

                <div className={styles.position}>
                    <button className={styles.ok}>Okay</button>
                </div>
            </div>
        );
    }

    LoginOverlay() {
        return (
            <VelocityComponent animation={{
                opacity: "1",
                translateX: "100%",
            }} runOnMount={true} duration={1000}>
                <div className={styles.loginOverlay}>
                    <div className={cx(styles.loginOverlay2, "skew-part")}>


                        <div className={globalStyles.stars}/>
                        <div className={globalStyles.stars2}/>
                        <div className={globalStyles.stars3}/>

                    </div>
                </div>
            </VelocityComponent>
        );
    }

    LoginContent() {
        return (
            <VelocityComponent animation={{
                opacity: "1",
            }} runOnMount={true} delay={1000} duration={1000}>
                <section className={cx("center-side", styles.loginContent)}>

                    <a href="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt=""
                                     className={styles.brandLogoLogin}/></a>


                    <div className={styles.loginForm}>
                        <form action="" className={styles.uiForm}>

                            <div className={styles.errorForm}>
                                <label className={cx("text", styles.loginError)}>{this.state.error}</label>

                            </div>


                            <div className={styles.textForm}>
                                <input id="name" className={cx(styles.input, styles.l1)} value={this.state.username}
                                       required autoComplete="off"
                                       onChange={event => {
                                           let state = this.state;
                                           state.username = event.target.value;
                                           this.setState(state)
                                       }}/>


                                <label className={styles.l1} htmlFor="name">Username</label>
                            </div>


                            <div className={styles.textForm}>
                                <input id="password" type="password" className={cx(styles.input, styles.l1)}
                                       value={this.state.password} required autoComplete="off"
                                       onChange={event => {
                                           let state = this.state;
                                           state.password = event.target.value;
                                           this.setState(state)
                                       }}/>
                                <label className={styles.l1} htmlFor="password">Password</label>

                            </div>


                            <h1>
                                <button className={styles.login} onClick={event => this.submit(event)}>Log in</button>
                            </h1>

                        </form>

                    </div>

                </section>
            </VelocityComponent>
        );
    }

    render() {

        if (this.state.success) {
            return (
                <Redirect to={sessionStorage.getItem("beforeLoginRedirect")}/>
            )
        }
        return (
            <div className={styles.loginBody}>
                <this.LoginOverlay/>
                <this.LoginContent/>
                {/*<this.NewPassword/>*/}
            </div>
        );
    }
}

export default Login;