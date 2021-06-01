$("#restartgame").hide();
var buttonsNumber = null;
var winner = null;

//Generating buttons according to the users input number, and based on that number will randomly generate a winning button.
//Will alert the user to try again and input a number if the first input was text or another number if the first input is bellow or equal to 0.

function generateButtons() {
    buttonsNumber = document.getElementById("buttonsNumberInput").value;
    winner = Math.floor(Math.random() * parseInt(buttonsNumber)) + 1;
    if (buttonsNumber <= 0) {
        return "Please enter a number higher than 0!";
    } else if (isNaN(buttonsNumber)) {
        return "Please enter a number and try again!";
    } else {
        $("#generatedButtons").empty();
        for (let i = 1, j = 0; i <= buttonsNumber; ++i) {
            let button_name = "Button " + i.toString();
            $('#generatedButtons').append('<button class="btn btn-dark" id=' + i + ' style="margin-right: 5px; margin-bottom: 5px;" onclick="printMessage(checkButton(id));">' + button_name + '</button>');
        }
        return "Try your luck and pick one button. Will it be the winner? Let's see:";
    }
}

//Checking if the winning button randomly generated in the function above is equal to the id of the clicked button.
function checkButton(id) {
    if (Number(winner) === Number(id)) {
        confetti({
            particleCount: 500,
            spread: 120,
            origin: {
                y: 0.6
            }
        });
        $("#restartgame").show()
        return "Congratulations, You guessed it!";
    }
    $("#restartgame").show()
    return "Sorry, Would you like to try again?";
}

//I think it's a good practice to restart the game on the same static webpage than doing a page refresh, the expected result is the same,
//but the first option is faster.
function reset() {
    document.getElementById("generateButtons").onclick = function() {
        printMessage(generateButtons());
    };
    buttonsNumber = document.getElementById("buttonsNumberInput").value;
    winner = Math.floor(Math.random() * parseInt(buttonsNumber)) + 1;
    $("#restartgame").hide();
    $("#generatedButtons").empty();
    return " ";
}

//Prints all messages according to parameters it receives from the other functions.
function printMessage(message) {
    return document.getElementById("message").innerHTML = message;
}
