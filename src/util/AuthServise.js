import axiosInstance from "./AxiosInstance";


export default class AuthService {

    static authRequest(username, password, errorSetter) {


        try {
            console.log(username);
            console.log(password);
            axiosInstance.post("/login", null, {
                headers:
                    {
                        Authorization: this.createBasicAuthToken(username, password),
                    },
                responseType: "text"
            }).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("Authentication", "true");
                    localStorage.setItem("JWT", response.data);
                    errorSetter("");
                }
            }).catch((error) => {
                if (error.response === undefined) {
                    errorSetter("Something goes wrong. Try again few minutes later");
                } else if (error.response.status === 401) {
                    errorSetter("Wrong username or password");
                } else if (error.response.status === 403) {
                    errorSetter("Please confirm your email before login");
                } else {
                    errorSetter("Something goes wrong. Try again few minutes later");
                }
            });
        } catch (e) {
            errorSetter("Something goes wrong. Try again few minutes later");
        }
    }

    static createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    static logout() {
        localStorage.removeItem("Authentication");
        localStorage.removeItem("JWT");
    }


}
