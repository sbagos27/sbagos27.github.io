let zipElement = document.querySelector("#zipcode");
document.querySelector("#userNameInput").addEventListener("change", checkUserName);
zipElement.addEventListener("change", displayCity); // "change" is like when you press enter
document.querySelector("#submitBtn").addEventListener("click", checkPassLen);
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
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    // alert(data.city);

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitudeLabel").textContent = data.latitude;
    document.querySelector("#longitudelabel").textContent = data.longitude;

}

async function displayPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8"
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#password").textContent = data.password;
}

async function checkUserName() {
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + document.querySelector("#userNameInput").value;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);
        let output = document.querySelector("#nameRes");
        if (data.available == true) {
            output.textContent = "Username Available!"
        } else {
            output.textContent = "Username Unavailable!";
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

function checkPassLen() {
    let passInput = document.querySelector("#passwordBlock").value;
    let output = document.querySelector("#passRes");
    if (passInput.length < 6) {
        output.style.color = "red";
        output.textContent = "Password too short! Must be 6 characters or more!"
    } else {
        output.textContent = "";
    }
}

