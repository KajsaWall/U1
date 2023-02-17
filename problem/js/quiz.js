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

}

function quiz_load () {

}


function random_number(max) {
    return Math.floor((Math.random() * max)+1);
}