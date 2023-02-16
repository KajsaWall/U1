"use strict";

document.getElementById("register").addEventListener("click", login_or_register_event);

function login_or_register_event(event){
    if(document.querySelector("button").textContent==="Login") {
        register();
    }
    else if (document.querySelector("button").textContent==="Register") {
        login();
    }
}
function login(){
    document.querySelector("main").style.backgroundColor="pink";
    document.querySelector("h1").textContent="LOGIN";
    document.querySelector("#feedback").textContent="Let the magic start!";
    document.querySelector("button").textContent="Login";
    document.querySelector("#register").textContent="New to this? Register for free";
}

function register() {
    document.querySelector("main").style.backgroundColor="thistle";
    document.querySelector("h1").textContent="REGISTER";
    document.querySelector("#feedback").textContent="Ready when you are...";
    document.querySelector("button").textContent="Register";
    document.querySelector("#register").textContent="Already have an account? Go to logn";
}

document.querySelector("button").addEventListener("click", login_or_register);

let prefix = "https://teaching.maumt.se/apis/access/";

function login_or_register (event) {

document.getElementById("contact").style.opacity = "1";
document.getElementById("contact").style.height = "100%";
document.getElementById("contact").style.width = "100%";


    let _username = document.querySelector("#username").value;
    console.log(_username);
    let _password = document.querySelector("#password").value;
    console.log(_password);
    if(document.querySelector("button").textContent === "Login") {
        let _prefix = `${prefix}?action=check_credentials&user_name=${_username}&password=${_password}`;
        const request_get = new Request (_prefix);
        _fetch(request_get);

    } else if (document.querySelector("button").textContent === "Register") {
        let body_post = {
            action: "register",
            user_name: _username,
            password: _password,
        };

        const request_post = new Request (prefix, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(body_post),
        });
        _fetch(request_post);
    }
}

async function _fetch(url, _function) {

    const response = await fetch(url);
    if (response.ok){
        const resource = await response.json();
        console.log(resource);
    }
    else{
        document.getElementById("contacttext").textContent = response.statusText;
        let button = document.createElement("button");
        button.textContent = "Close";
        document.getElementById("contacttext").append(button);
        console.log("something went wrong");
    }
}