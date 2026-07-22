//objects
const footerText = document.querySelector("footer p");

const form = document.querySelector('form');

//retrieve form data (later this will be moved to a function)

//retrieve the selected size option
//thank you Parthik Gosar for the code to find the currently selected radio button: https://stackoverflow.com/a/15839451
let size = document.querySelector('input[name="size"]:checked').value;

//retrieve all selected toppings
let toppingNodes = document.querySelectorAll('input[name="toppings[]"]:checked');
//populate a toppings array list with the actual values (as strings)
let toppings = [];
for(let i = 0; i < toppingNodes.length; i++) {
    toppings[i] = toppingNodes[i].value;
}

let crust = document.getElementById("crust").value;

//variables
const creatorName = "Zecheriah Ferguson";
const creatorStudentID = 200639774;

//dynamically add name and student id to footer
footerText.textContent = `Site by ${creatorName} - ${creatorStudentID}`;
