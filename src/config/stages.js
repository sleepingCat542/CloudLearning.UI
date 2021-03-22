export const Stage = {

    SIGN_UP: {
      FORM: 1,
      SUCCESS: 2
    },
    LOGIN: {
        FORM: 1,
        SUCCESS: 2
    },
    SUBJECT: {
        SUBJECT_INFO: 0,
        REDIRECT: 1,
    },
    TEST_COMPLETING: {
        PREVIEW: 0,
        IN_PROGRESS: 1,
        RESULTS: 2,
    },
    TEST_CREATING: {
        CREATING: 1,
        REDIRECT: 2,
        ERROR: 3,
    },
    RESULTS: {
        WATCH_RESULTS: 0,
    },
    MANAGEMENT: {
        NO_ACCESS: 403,
        TEST_INFO: 1,
        ACCESS_MANAGEMENT: 2,
        ACCESS_MANAGEMENT_LIST: 3,
        REDIRECT: 300,
    },
    LEFT_SIDE_MENU:{
        RECEIVED: 1,
    },
    PROFILE:{
        SHOW: 1,
        EDIT: 2,
    },
    CONFIRM: {
        SUCCESS: 1,
        ERROR: 0,
    },
    LOADING: -1,
}