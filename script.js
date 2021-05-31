$("#restartgame").hide();
var buttons_number = null;
var winner = null;
//Mapping "Enter" key to trigger the "Generate Button"
document.getElementById("buttons_number_input")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("generate_buttons").click();
        }
    });

//Generating buttons according to the users input number, and based on that number will randomly generate a winning button.
//Will alert the user to try again and input a number if the first input was text or another number if the first input is bellow or equal to 0.
//Disabled the "Generate Button" after a valid input and made it to be available only after the restart of the app.
function generate_buttons() {
    buttons_number = document.getElementById("buttons_number_input").value;
    winner = Math.floor(Math.random() * parseInt(buttons_number)) + 1;
    if (buttons_number <= 0) {
        return 0;
    } else if (isNaN(buttons_number)) {
        return -1;
    } else {
        $("#generated_buttons").empty();
        for (let i = 1, j = 0; i <= buttons_number; ++i) {
            let button_name = "Button " + i.toString();
            $('#generated_buttons').append('<button class="btn btn-dark" id=' + i + ' style="margin-right: 5px; margin-bottom: 5px;" onclick="print_message(check_button(id));">' + button_name + '</button>');
        }
        return "pick";
    }
}

//Checking if the winning button randomly generated in the function above is equal to the id of the clicked button.
function check_button(id) {
    if (Number(winner) === Number(id)) {
        confetti({
            particleCount: 500,
            spread: 120,
            origin: {
                y: 0.6
            }
        });
        $("#restartgame").show()
        return true;
    }
    $("#restartgame").show()
    return false;
}

//I think it's a good practice to restart the game on the same static webpage than doing a page refresh, the expected result is the same,
//but the first option is faster.
//Given the fact I'm disabling the "Generate buttons" button, i'm adding the click action after resetting the game.
function reset() {
    document.getElementById("generate_buttons").onclick = function() {
        print_message(generate_buttons());
    };
    buttons_number = document.getElementById("buttons_number_input").value;
    winner = Math.floor(Math.random() * parseInt(buttons_number)) + 1;
    $("#restartgame").hide();
    $("#generated_buttons").empty();
    return "reset";
}

function print_message(result) {
    if (result === "pick") {
        message = "Try your luck and pick one button. Will it be the winner? Let's see:";
    } else if (result === 0) {
        message = "Please enter a number higher than 0!";
    } else if (result === -1) {
        message = "Please enter a number and try again!";
    } else if (result === false) {
        message = "Sorry, Would you like to try again?";
    } else if (result === true) {
        message = "Congratulations, You guessed it!";
    } else if (result === "reset") {
        message = " ";
    }
    return document.getElementById("message").innerHTML = message;
}
