//event listener
document.querySelector("#guessBtn").addEventListener("click", guess); // event listeners dont want () for functions

//Globale variables
let MAX_GUESS = 7;
let attempt = 0;
let win = false;

let randomNumber = Math.floor(Math.random() * 99) + 1;
console.log(randomNumber);
//generates random number from 1 - 99

function guess() {
    let userGuess = document.querySelector("#userGuess").value;
    // value is ONLY for input elements 
    // alert(userGuess);    
    // document.querySelector("#userGuesses").textContent += userGuess + " ";
    document.querySelector("#userGuesses").textContent += `${userGuess} `; // fancy way to display

    document.querySelector("#userGuesses").style.color = "red";
    document.querySelector("#userGuesses").style.backgroundColor = "black";

    if (attempt < 7) {
        attempt++;
        if (userGuess > randomNumber) {
            high();

            if (attempt == 7) {
                lose()
            }

        } else if (userGuess < randomNumber) {
            low();

            if (attempt == 7) {
                lose()
            }

        } else {
            congrats();
            win = true;
            attempt = 7;
        }

    } else if (win) {
        winner();
    } else {
        lose();
    }
}

function congrats() {
    document.querySelector("#highLow").textContent = "Congrats you got it right!";
    document.querySelector("#highLow").style.color = "lime  ";
    document.querySelector("#highLow").style.backgroundColor = "black";
}

function lose() {
    document.querySelector("#highLow").textContent = "YOU LOSE HAHAHAHAH";
    document.querySelector("#highLow").style.color = "maroon";
    document.querySelector("#highLow").style.backgroundColor = "grey";
}

function high() {
    document.querySelector("#highLow").textContent = "Guess to high!";
    document.querySelector("#highLow").style.color = "red";
    document.querySelector("#highLow").style.backgroundColor = "yellow";
}

function low() {
    document.querySelector("#highLow").textContent = "Guess to low!";
    document.querySelector("#highLow").style.color = "orange";
    document.querySelector("#highLow").style.backgroundColor = "purple";
}

function winner() {
    document.querySelector("#highLow").textContent = "YOU ALREADY WON";
    document.querySelector("#highLow").style.color = "lime";
    document.querySelector("#highLow").style.backgroundColor = "grey";
}