/*
    if(window.localStorage.getItem("isLoggedIn")) {
        quiz_setup("resource");
    } else{
        login_setup();
    };
*/
    //const loggedIn = window.localStorage.getItem("isLoggedIn");
   // loggedIn ? quiz_setup("hej") : login_setup();
function contact_function () {
    const contact_div = document.createElement("div");
    contact_div.setAttribute("id", "contact");
    contact_div.innerHTML= `<div>Contacting server...</div>`;
    document.querySelector("main").append(contact_div);
    return contact_div;
}


async function check_request(request, type) {

    let contact = contact_function();
    contact.classList.remove("hide");
   // document.querySelector("#contact").classList.remove("hide");

    const response = await fetch_function(request);
    const resource = await response.json();
    console.log(response);
    console.log(resource);

    if(response.status === 200) {
        if(type === "login") {
            stay_loggedin()
            contact.classList.add("hide");
            
        } else if(type === "register") {
            feedback("Registration Complete. Please proceed to login.");
            contact.classList.add("hide");
        }
    }else if(response.status === 400) {
        feedback("Please enter username and password.");
        contact.classList.add("hide");

    }else if(response.status === 404) {
       // document.querySelector("#contact").classList.add("hide");
       contact.classList.add("hide");
        document.querySelector("#p").textContent = "Wrong username or password";
        document.querySelector("#p").style.backgroundColor = "white";

    }else if(response.status === 409) {
        feedback("Sorry that name is taken. Please try another one.");
        contact.classList.add("hide");

    }else if(response.status === 418) {
        feedback("The server thinks it is not a teapot!");
        contact.classList.add("hide");
    }
}

async function fetch_function (request) {
    const response = await fetch(request);
    return response; 
}

function feedback (message) {

    const feedback = document.createElement("div");
    feedback.setAttribute("id", "feedback");
    feedback.innerHTML = `
    <p>${message}</p> <button id="close">CLOSE</button>
    `;
    document.querySelector("body").append(feedback);
    feedback.querySelector("button").addEventListener("click", () => {
        feedback.classList.add("hide");
        //document.querySelector("#contact").classList.add("hide");
    })
}

function stay_loggedin() {
    window.localStorage.setItem("isLoggedIn", true)
    quiz_setup();

}

function log_out () {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");
    login_setup();
}

