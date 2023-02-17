async function check_request(request, type) {

    document.querySelector("#contact").classList.remove("hide");

    const response = await fetch_function(request);
    const resource = await response.json();
    console.log(response);
    console.log(resource);

    if(response.status === 200) {
        if(type === "login") {
            quiz_setup(resource);
        } else if(type === "register") {
            feedback("Registration Complete. Please proceed to login.");
        }
    }else if(response.status === 400) {
        feedback("Please enter username and password.");
    }else if(response.status === 404) {
        document.querySelector("#contact").classList.add("hide");
        document.querySelector("#p").textContent = "Wrong username or password";
        document.querySelector("#p").style.backgroundColor = "white";
    }else if(response.status === 409) {
        feedback("Sorry that name is taken. Please try another one.");
    }else if(response.status === 418) {
        feedback("The server thinks it is not a teapot!");
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
        document.querySelector("#contact").classList.add("hide");
    })
}