import * as React from "react";
import ru from "../img/ru-1.png";
import en from "../img/en-1.png";
import globalStyles from "./style.module.css"
import cx from "classnames"
import VelocityComponent from "velocity-react/velocity-component"
import {Link} from "react-router-dom";
import slide1 from "../img/slide-1.jpg";
import slide2 from "../img/slide-2.jpg";
import slide3 from "../img/slide-3.jpg";
import BackgroundSlider from 'react-background-slider'



class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loginButtonHover: false, signUpButtonHover: false};
        this.SignUpButton = this.SignUpButton.bind(this);
        this.LoginButton = this.LoginButton.bind(this);
        this.Content = this.Content.bind(this);
    }


    LoginButton() {
        return (
            <Link to="/login"
               className={cx(globalStyles.a, globalStyles.loginBtn)}>
                Log In
            </Link>
        );
    }

    SignUpButton() {
        return (
            <Link to="/sign_up" className={cx(globalStyles.signUpBtn, globalStyles.a)}>
                Sign Up
            </Link>
        );
    }

    Content() {
        return (
            <VelocityComponent animation={{
                opacity: "1",
            }} runOnMount={true} duration={1000} delay={1000}>
                <section className="left-side">
                    {/*Logo */}
                    <Link className={globalStyles.a} to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt=""
                                                                className={globalStyles.brandLogo}/></Link>
                    <div className={globalStyles.content}>
                        <h1 className={cx("text-intro", "opacity-0", globalStyles.h1)}>
                            Welcome to Cloud Learning
                        </h1>

                        <h2 className={cx("text-intro", "opacity-0", globalStyles.h2)}>It's never too late for learning!</h2>

                        <nav>
                            <ul>
                                <li>
                                    <this.LoginButton/>
                                </li>
                                <li>
                                    <this.SignUpButton/>
                                </li>
                            </ul>
                        </nav>

                    </div>

                    {/*<a className={globalStyles.a}><img src={ru} className="ru" alt="#"/></a>*/}
                    {/*<a className={globalStyles.a}><img src={en} className="en" alt="#"/></a>*/}


                </section>
            </VelocityComponent>
        );
    }

    Clouds() {
        return (
            <div className={globalStyles.cloudAnimation}>
                <img src={process.env.PUBLIC_URL + "/img/cloud-01.png"} alt="1" className={globalStyles.cloud1}/>

                <img src={process.env.PUBLIC_URL + "/img/cloud-02.png"} alt="2" className={globalStyles.cloud2}/>

                <img src={process.env.PUBLIC_URL + "/img/cloud-03.png"} alt="3" className={globalStyles.cloud3}/>

                <img src={process.env.PUBLIC_URL + "/img/cloud-04.png"} alt="4" className={globalStyles.cloud4}/>
            </div>
        );

    }



    Overlay() {
        return (
            <VelocityComponent
                animation={{
                    translateX: "100%",
                    opacity: "1",
                    easing: [0.7, 0, 0.3, 1],
                }} runOnMount={true} duration={1000}>
                <div className={globalStyles.globalOverlay}>
                    <div className="overlay skew-part">

                        <div className={globalStyles.stars}/>
                        <div className={globalStyles.stars2}/>
                        <div className={globalStyles.stars3}/>

                    </div>
                </div>
            </VelocityComponent>
        );
    }


    render() {
        console.log(this.props);
        return (
            <div>
                <BackgroundSlider images={[slide1, slide2, slide3]} duration={5} transition={0.5}/>

                {/*Overlay and Star effect */}

                <this.Overlay/>

                {/*START - Home/Left Part */}
                <this.Content this={this.props.this}/>
                {/*END - Home/Left Part */}

                {/*Cloud animation */}

                <this.Clouds/>
            </div>
        );
    }
}

export default Main;

