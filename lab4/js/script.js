let zipElement = document.querySelector("#zipcode");
document.querySelector("#userNameInput").addEventListener("change", checkUserName);
zipElement.addEventListener("change", displayCity); // "change" is like when you press enter
document.querySelector("#submitBtn").addEventListener("click", validate);
document.querySelector("#state").addEventListener("change", displayStates)
displayStates();

document.querySelector("#passwordBlock").addEventListener("click", displayPassword);

async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);
        // alert(data[0].state)

        for (let i of data) { // i counts a the object itself
            let optionEL = document.createElement("option");
            optionEL.id = i.state;
            optionEL.textContent = i.state;
            optionEL.value = i.usps;

            document.querySelector("#state").append(optionEL);
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
    displayCounty();
}

async function displayCounty() {
    let id = document.querySelector("#state").value;
    let url = "https://csumb.space/api/countyListAPI.php?state=" + id;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    // document.querySelector("#county")
    document.getElementById('county').options.length = 0;

    for (let i of data) {
        let optionEL = document.createElement("option");
        optionEL.textContent = i.county;
        document.querySelector("#county").append(optionEL);
    }
}

async function displayCity() {
    // alert("displaying city!!")

    let zipcode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipcode;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        let data = await response.json();
        console.log(data);
        // alert(data.city);
        if(data == false){
            document.querySelector("#zipError").textContent = "Zip code not found";
            document.querySelector("#city").textContent = "";
            document.querySelector("#latitudeLabel").textContent = "";
            document.querySelector("#longitudelabel").textContent = "";
        } else {
            document.querySelector("#zipError").textContent = "";
            document.querySelector("#city").textContent = data.city;
            document.querySelector("#latitudeLabel").textContent = data.latitude;
            document.querySelector("#longitudelabel").textContent = data.longitude;
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function displayPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8"
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#password").textContent = data.password;
}

async function checkUserName() {
    let output = document.querySelector("#nameRes");
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + document.querySelector("#userNameInput").value;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);
        if (data.available == true) {
            output.textContent = "Username Available!"
            output.style.color = "green";
        } else {
            output.textContent = "Username Unavailable!";
            output.style.color = "red";
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

// this function checks the password and username length, and double checks the password
function validate() {
    let username = document.querySelector("#userNameInput").value;
    let nameOutput = document.querySelector("#nameRes");
    if(username.length < 3){
        nameOutput.textContent = "Username Must be 3 Characters or longer"
        nameOutput.style.color = "red";
    }

    let passInput = document.querySelector("#passwordBlock").value;
    let passOutput = document.querySelector("#passRes");
    if (passInput.length < 6) {
        passOutput.style.color = "red";
        passOutput.textContent = "Password too short! Must be 6 characters or more!"
        return;
    } else {
        passOutput.textContent = "";
    }
    let passwordInput2 = document.querySelector("#passwordBlock2").value;

    if(passInput == passwordInput2){
        passOutput.textContent = "Passwords MATCH!"
        passOutput.style.color = "green";
    } else {
        passOutput.textContent = "Passwords Don't Match"
        passOutput.style.color = "red";
    }


}

