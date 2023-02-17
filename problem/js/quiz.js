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
    answer_feedback.innerHTML = `<p></p> <button id="answer_button"></button>`
    document.querySelector("body").append(answer_feedback);

    quiz_start();
}

async function quiz_start() {
    
    const breed = ALL_BREEDS[random_number(ALL_BREEDS.length)];
    const breed_request = new Request (`https://dog.ceo/api/breed/${breed.url}/images`);
    const response = await fetch_function(breed_request);
    const resource = await response.json();
    const image = resource.message[0];
    console.log(image);

    document.querySelector(".image").style.backgroundImage = `url("${image}")`;
}

function random_number(max) {
    // Returnerar en random siffra mellan 0 och max - 1
    return Math.floor(max * Math.random());
  }