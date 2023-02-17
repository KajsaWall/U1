"use strict";


function login_or_register_event(event){
    if(document.querySelector("button").textContent==="Login") {
        register_setup();
    }
    else if (document.querySelector("button").textContent==="Register") {
        login_setup();
    }
}

function login_setup() {
    document.querySelector("#container").innerHTML = "";
    document.querySelector("main").classList.remove("register");
    document.querySelector("main").classList.add("login");
    document.querySelector("main").style.backgroundColor="pink";

    const contact_div = document.createElement("div");
    contact_div.setAttribute("id", "contact");
    contact_div.classList.add("hide");
    contact_div.innerHTML= `<div>Contacting server...</div>`;
    document.querySelector("main").append(contact_div);

    document.querySelector("#container").innerHTML = `
    <h1>LOGIN</h1>

    <label>User Name:</label>
    <input type="text" id="username">
    <label>Password:</label>
    <input type="password" id="password">

    <p id="p">Let the magic start!</p>

    <button>Login</button>

    <h2 id="link">New to this? Register for free</h2>
    `;

    document.getElementById("link").addEventListener("click", login_or_register_event);
    document.querySelector("button").addEventListener("click", login_or_register);
}

function register_setup() {

    document.querySelector("#container").innerHTML = "";
    document.querySelector("main").classList.remove("login");
    document.querySelector("main").classList.add("register");
    document.querySelector("main").style.backgroundColor="thistle";

    document.querySelector("#container").innerHTML = `
    <h1>REGISTER</h1>

    <label>User Name:</label>
    <input type="text" id="username">
    <label>Password:</label>
    <input type="password" id="password">

    <p id="p">Ready when you are...</p>

    <button>Register</button>

    <h2 id="link">Already have an account? Go to login</h2>
    `;

    document.getElementById("link").addEventListener("click", login_or_register_event);
    document.querySelector("button").addEventListener("click", login_or_register);
}


let prefix = "https://teaching.maumt.se/apis/access/";

function login_or_register (event) {

    let _username = document.querySelector("#username").value;
    console.log(_username);
    let _password = document.querySelector("#password").value;
    console.log(_password);

    if(document.querySelector("button").textContent === "Login") {
        
        let _prefix = `${prefix}?action=check_credentials&user_name=${_username}&password=${_password}`;
        const request_get = new Request (_prefix);
        check_request(request_get, "login");

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
        check_request(request_post, "register");
    }
}

