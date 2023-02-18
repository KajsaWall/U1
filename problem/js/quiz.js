function quiz_setup (user_data) {
    document.querySelector("#container").innerHTML = "";
    document.querySelector("#contact").classList.add("hide");
    document.querySelector("main").classList.remove("login");
    document.querySelector("main").classList.remove("register");
    document.querySelector("main").style.backgroundColor="plum";

    document.querySelector("#container").innerHTML = `
    <div id="logged_in">
    <p id="user">${user_data.data.user_name}</p>
    <button id="logout">logout</button>
    </div>

    <div class="image"></div>

    <div class="options">
        <div id="option1"></div>
        <div id="option2"></div>
        <div id="option3"></div>
        <div id="option4"></div>
    </div>
    `;
    document.querySelector("#logout").addEventListener("click", login_setup);

    const answer_feedback = document.createElement("div");
    answer_feedback.setAttribute("id", "answer_feedback");
    answer_feedback.classList.add("hide");
    answer_feedback.innerHTML = `<div id="answer_div"> <p id="correct_or_false"></p> <button id="answer_button"></button> </div>`
    document.querySelector("body").append(answer_feedback);

    quiz_start();
}

async function quiz_start() {

    document.querySelector(".image").style.backgroundImage = `url(".media/css/logo.png")`;
    
    document.querySelectorAll(".options > div")
        .forEach(option => {
            option.textContent = "";
        })

    let breed = ALL_BREEDS[random_number(ALL_BREEDS.length)];
    console.log(breed);
    let breed_request = new Request (`https://dog.ceo/api/breed/${breed.url}/images`);
    let response = await fetch_function(breed_request);
    let resource = await response.json();
    let image = resource.message[0];
    console.log(image);

    document.querySelector(".image").style.backgroundImage = `url("${image}")`;
    //document.querySelector(`#option${random_number(5)}`).textContent = breed.name;
    let right_answer = document.getElementById(`option${random_number(4)}`);
    right_answer.textContent = breed.name;
    let right = right_answer.textContent;
    console.log(right);

    for(let i = 1; i < 5; i++) {
        if(document.getElementById(`option${i}`).textContent === "") {
            document.getElementById(`option${i}`).textContent = ALL_BREEDS[random_number(ALL_BREEDS.length)].name;
        };
    }

    document.querySelectorAll(".options > div")
        .forEach(option => {
            option.addEventListener("click", check_answer);
        });

    function check_answer (event) {
        if(event.target.textContent === right) {
            console.log(right);
            document.getElementById("answer_feedback").classList.remove("hide");
            document.getElementById("correct_or_false").textContent = "CORRECT!";
            document.getElementById("answer_button").textContent = "ONE MORE";
            document.getElementById("answer_button").addEventListener("click", () => {
                document.getElementById("answer_feedback").classList.add("hide");
                quiz_start();
            })
        } else if(event.target.textContent !== right) {
            console.log("wrong");
            console.log(right);
            document.getElementById("answer_feedback").classList.remove("hide");
            document.getElementById("answer_div").style.backgroundColor = "hotpink";
            document.getElementById("correct_or_false").textContent = "Wrong Answer!";
            document.getElementById("answer_button").textContent = "ONE MORE";
            document.getElementById("answer_button").addEventListener("click", () => {
                document.getElementById("answer_feedback").classList.add("hide");
            })
        }
    }

   

}

function random_number(max) {
    return Math.floor((Math.random() * max)+1);
}