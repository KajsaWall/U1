if(window.localStorage.getItem("isLoggedIn")) {
    quiz_setup();
} else {
    login_setup();
}