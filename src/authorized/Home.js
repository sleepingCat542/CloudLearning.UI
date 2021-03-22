import * as React from "react";
import styles from "./main.module.css";

export class Home extends React.Component{

    render() {
        return (
            <div className={styles.mainForm}>
                <img className={styles.logo2} src={process.env.PUBLIC_URL + "/img/logo2.png"}
                     alt="logo"/>
                <div className={styles.inDeveloping}>In developing...</div>
            </div>

        );
    }

}