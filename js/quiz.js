"use strict";

function quiz_setup() {
    
    let USER = window.localStorage.getItem("User");

    document.querySelector("#container").innerHTML = "";
    document.querySelector("main").classList.remove("login");
    document.querySelector("main").classList.remove("register");
    document.querySelector("footer").classList.remove("login");
    document.querySelector("main").style.backgroundColor="plum";
    document.querySelector("#container").classList.add("quiz");
    document.querySelector("footer").classList.add("quiz");
    document.querySelector("header").classList.add("quiz");

    document.querySelector("#container").innerHTML = `
    <div id="logged_in">
        <p id="user">${USER}</p>
        <button id="logout">logout</button>
    </div>

    <div id="image_div">
        <img class="image" src="media/logo.png">
    </div>

    <div class="options">
        <div id="option1"></div>
        <div id="option2"></div>
        <div id="option3"></div>
        <div id="option4"></div>
    </div>
    `;

    document.querySelector("#logout").addEventListener("click", log_out);

    const answer_feedback = document.createElement("div");
    answer_feedback.setAttribute("id", "answer_feedback");
    answer_feedback.classList.add("hide");
    answer_feedback.innerHTML = `<div id="answer_div"> <p id="correct_or_false"></p> <button id="answer_button"></button> </div>`
    document.querySelector("body").append(answer_feedback);

    quiz_start();

}


async function quiz_start() {

    document.querySelector(".options").classList.add("hide");

    let contact = contact_function();
    contact.classList.remove("hide");
    contact.innerHTML = `<div>Getting a random image...</div>`;
    document.querySelector("#image_div").innerHTML= `<img class="image" src="media/logo.png">`;
    
    document.querySelectorAll(".options > div")
        .forEach(option => {
            option.textContent = "";
        });

    let ALL_BREEDS_copy = ALL_BREEDS
        .map(b => b);

    let right_index = random_number(ALL_BREEDS.length);
    let right_breed = ALL_BREEDS[right_index];
    ALL_BREEDS_copy
        .splice(right_index, 1);

    let breed_request = new Request (`https://dog.ceo/api/breed/${right_breed.url}/images`);

    let response = await fetch_function(breed_request);
    let resource = await response.json();
    let image = resource.message[random_number(resource.message.length)];

    if(response.ok) {
        document.querySelector("#image_div").innerHTML= `<img class="image" src="${image}">`;
        document.querySelector(".options").classList.remove("hide");
    } else {
        document.querySelector("#image_div").innerHTML= `<img class="image" src="media/logo.png">`;
    };

    contact.classList.add("hide");

    let random_number_plus_one = random_number(4) + 1;
    let right_div = document.getElementById(`option${random_number_plus_one}`);
    right_div.textContent = right_breed.name;
    let right_answer = right_div.textContent;

    for(let i = 1; i < 5; i++) {
        if(document.getElementById(`option${i}`).textContent === "") {

            let index = random_number(ALL_BREEDS_copy.length);
            let breed = ALL_BREEDS_copy[index];
            ALL_BREEDS_copy
                .splice(index, 1);
            document.getElementById(`option${i}`).textContent = breed.name;

        };
    }

    document.querySelectorAll(".options > div")
        .forEach(option => {
            option.addEventListener("click", check_answer);
        });

    function check_answer(event) {

        if(event.target.textContent === right_answer) {

            document.getElementById("answer_feedback").classList.remove("hide");
            document.getElementById("correct_or_false").textContent = "CORRECT! :D";
            document.getElementById("answer_div").style.backgroundColor = "orchid";
            document.getElementById("answer_button").textContent = "ONE MORE";
            document.getElementById("answer_button").addEventListener("click", restart_quiz);

        } else if(event.target.textContent !== right_answer) {

            document.getElementById("answer_feedback").classList.remove("hide");
            document.getElementById("correct_or_false").textContent = "Wrong Answer! D:";
            document.getElementById("answer_div").style.backgroundColor = "hotpink";
            document.getElementById("answer_button").textContent = "ONE MORE";
            document.getElementById("answer_button").addEventListener("click", restart_quiz);

        }
    }
}


function random_number(max) {

    // Returnerar en random siffra mellan 0 och max - 1
    return Math.floor(max * Math.random());
    
}


function restart_quiz(event) {

    document.getElementById("answer_feedback").classList.add("hide");
    quiz_start();

}

