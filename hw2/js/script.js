document.querySelector("#higherBtn").addEventListener("click", () => gamble("higher"));
document.querySelector("#lowerBtn").addEventListener("click", () => gamble("lower"));
document.querySelector("#equalBtn").addEventListener("click", () => gamble("equal"));
document.querySelector("#balanceBtn").addEventListener("click", addBalance);

let balance = 0;
let previousPlayerNumbers = [];

const balanceDisplay = document.querySelector("#balanceDisplay");
const balanceNumber = document.querySelector("#balanceNumber");
const resultDisplay = document.querySelector("#result");
const image = document.querySelector("#resultImage");

let rangeMax = 100
let randomNumber = Math.floor(Math.random() * rangeMax) + 1;
let playerNumber = Math.floor(Math.random() * rangeMax) + 1;

display();
function display(){
    document.querySelector("#currentNumber").textContent = `The CURRENT number is: ${randomNumber}`;
}

function addBalance() {
    let addedCash = Number(balanceNumber.value);
    balance += addedCash;
    balanceDisplay.textContent = `Balance: $${balance}`;
}

function gamble(choice) {
    rangeMax = Number(document.querySelector("#rangeMax").value) || 100;
    let bet = Number(document.querySelector("#bet").value);

    if (!bet || bet <= 0 || bet > balance) {
        resultDisplay.textContent = "Invalid bet amount!";
        return;
    }

    playerNumber = Math.floor(Math.random() * rangeMax) + 1;
    previousPlayerNumbers.push(playerNumber);
    document.querySelector("#previousNumber").textContent = `The target was ${randomNumber}, you rolled ${playerNumber}`;

    let win = false;
    let payoutMultiplier = 1;

    if (choice === "higher" && playerNumber > randomNumber) {
        win = true;
    } else if (choice === "lower" && playerNumber < randomNumber) {
        win = true;
    } else if (choice === "equal" && playerNumber === randomNumber) {
        win = true;
        payoutMultiplier = 5; 
    }

    if (win) {
        let winnings = bet * payoutMultiplier;
        balance += winnings;
        resultDisplay.textContent = `You WON! Player number: ${playerNumber} | Payout: $${winnings}`;
        document.body.style.backgroundColor = "green";
        image.src = "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif";
    } else {
        balance -= bet;
        resultDisplay.textContent = `You LOST! Player number: ${playerNumber}`;
        document.body.style.backgroundColor = "darkred";
        image.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGtsbGNscDNnNXkwdnVwbHZpOWRnZzUwdGdldzluZWl2ZTg2ejBxZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WteMcH28vSuGB3SUHL/giphy.gif";
    }

    randomNumber = Math.floor(Math.random() * rangeMax) + 1;
    
    display(); 
    console.log("Prev numbers")
    for(let i in previousPlayerNumbers){
        console.log(i); 
    }
    balanceDisplay.textContent = `Balance: $${balance}`;
}