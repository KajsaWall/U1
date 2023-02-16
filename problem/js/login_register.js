"use strict";

document.getElementById("register").addEventListener("click", login_or_register_event);


/* 
document.querySelector("main").style.backgroundColor = "thistle";
document.querySelector("h1").textContent = "REGISTER";
document.getElementById("feedback").textContent = "Ready when you are...";
document.querySelector("button").textContent = "Register";
document.getElementById("register").textContent = "Already have an account? Go to login";
*/


function login(){
    document.querySelector("main").style.backgroundColor="pink";
    document.querySelector("h1").textContent="LOGIN";
    document.querySelector("#feedback").textContent="Let the magic start!";
    document.querySelector("button").textContent="Login";
    document.querySelector("#register").textContent="New to this? Register for free";
}

function login_or_register_event(event){
    if(document.querySelector("button").textContent==="Login") {
        register();
    }
    else {
        login();
    }
}
function register() {
    document.querySelector("main").style.backgroundColor="thistle";
    document.querySelector("h1").textContent="REGISTER";
    document.querySelector("#feedback").textContent="Ready when you are...";
    document.querySelector("button").textContent="Register";
    document.querySelector("#register").textContent="Already have an account? Go to logn";
}