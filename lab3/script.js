document.querySelector("#submitBtn").addEventListener("click", gradeQuiz);

shuffleQ1Choices();
loadTimesTaken();

function loadTimesTaken() {
    let times = localStorage.getItem("quizTaken");
    if (times == null) {
        times = 0;
    }
    document.querySelector("#timesTaken").textContent = "Times Taken: " + times;
}

function shuffleQ1Choices() {
    let q1Choices = ["2", "4", "22", "0"];
    q1Choices = _.shuffle(q1Choices);
    console.log(q1Choices);
    //<input type="radio" name="q1" value="fontColor"> font-color 

    for (let i of q1Choices) {
        // instead of q1Choices[i] it uses the index as i and knows
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;

        labelElement.prepend(radioElement);

        document.querySelector("#q1ChoicesDiv").append(labelElement);

        console.log(labelElement);
    }
}

function gradeQuiz() {
    let score = 0;
    let answerQ1 = "4";
    let answerQ2 = "16";
    let answerQ3 = "22";
    let answerQ4 = "2.5";
    let answerQ5a = "--2";
    let answerQ5b = "2";

    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;
    console.log(userAnswer1)

    let userAnswer2 = document.querySelector("#q2").value;
    console.log(userAnswer2)

    let userAnswer3 = document.querySelector("#q3").value;
    console.log(userAnswer3)

    let userAnswer4 = document.querySelector("#q4").value;
    console.log(userAnswer4)

    let userAnswer5a;
    let userAnswer5b;

    if (document.querySelector("#q5a").checked) {
        userAnswer5a = document.querySelector("#q5a").value;
        console.log(userAnswer5a)
    }
    if (document.querySelector("#q5b").checked) {
        userAnswer5b = document.querySelector("#q5b").value;
        console.log(userAnswer5b)
    }

    // let userAnswer5 = document.querySelector("#q5").checked;

    // this is how you grab the value of a radio button

    if (userAnswer1 == answerQ1) {
        score += 20;
        // alert("THE ANSWER 4 IS RIGHT")
        // make font green
        showResult("q1", true);
    } else {
        showResult("q1", false);
    }

    if (userAnswer2 == answerQ2) {
        score += 20;
       // alert("THE ANSWER 16 IS RIGHT")
        showResult("q2", true);
    } else {
        showResult("q2", false);
    }

    if (userAnswer3 == answerQ3) {
        score += 20;
        // alert("THE ANSWER 22 IS RIGHT")
        showResult("q3", true);
    } else {
        showResult("q3", false);
    }

    if (userAnswer4 == answerQ4) {
        score += 20;
        // alert("THE ANSWER 2.5 IS RIGHT")
        showResult("q4", true);
    } else {
        showResult("q4", false);
    }

    console.log("userAnswer5a = " + userAnswer5a)
    console.log("answerQ5a = " + answerQ5a)
    console.log("userAnswer5b = " + userAnswer5b)
    console.log("answerQ5b = " + answerQ5b)
    
    if (userAnswer5a == answerQ5a && userAnswer5b == answerQ5b) {
        score += 20;
        // alert("THE ANSWERS 2 AND --2 ARE RIGHT")
        showResult("q5", true);
    } else {
        showResult("q5", false);
    }

    alert("YOU SCORE " + score + "/100")

    if(score >= 80){
        document.querySelector("#congrats").style.display = "block"
        document.querySelector("#congrats").textContent =
        "CONGRATS YAY!";
    } else {
        document.querySelector("#congrats").style.display = "none"
    }

    let times = localStorage.getItem("quizTaken");
    if (times == null) {
        times = 0;
    }
    times++;
    localStorage.setItem("quizTaken", times);
    document.querySelector("#timesTaken").textContent = "Times Taken: " + times;
}

function showResult(question, isCorrect) {
    let feedback = document.querySelector("#" + question + "Feedback");
    let img = document.querySelector("#" + question + "Img");

    if (isCorrect) {
        feedback.textContent = " Correct!";
        feedback.style.color = "green";
        img.src = "images/r.jpg";
    } else {
        feedback.textContent = " Incorrect!";
        feedback.style.color = "red";
        img.src = "images/w.jpg";
    }
}