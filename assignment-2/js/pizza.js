//objects
const footerText = document.querySelector("footer p");

const form = document.querySelector('form');
const submitButton = document.getElementById("submit");

//variables

let size, crust;
let toppings = [];


const creatorName = "Zecheriah Ferguson";
const creatorStudentID = 200639774;

//dynamically add name and student id to footer
footerText.textContent = `Site by ${creatorName} - ${creatorStudentID}`;

function getFormData() {
    //retrieve the selected size node
    //thank you Parthik Gosar for the code to find the currently selected radio button: https://stackoverflow.com/a/15839451
    size = document.querySelector('input[name="size"]:checked');

    //retrieve all selected topping nodes
    toppings = document.querySelectorAll('input[name="toppings[]"]:checked');

    //retrieve selected crust node
    crust = document.getElementById("crust");
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    getFormData();
});
