//objects
const footerText = document.querySelector("footer p");

const form = document.querySelector('form');
const submitButton = document.getElementById("submit");
const errorDisplay = document.getElementById("error");

//variables

//updated when form is submitted
let size, crust;
let toppings = [];

//these are set at page load and used for validation. (ie: form submissions must match these, otherwise it's assumed that the person edited the html with inspect element)
const availableSizes = document.querySelectorAll('input[name="size"]');
const availableToppings = document.querySelectorAll('input[name="toppings[]"]');
const availableCrusts = document.querySelectorAll("#crust");

let error;

const creatorName = "Zecheriah Ferguson";
const creatorStudentID = 200639774;

//dynamically add name and student id to footer
footerText.textContent = `Site by ${creatorName} - ${creatorStudentID}`;

function getFormData() {
    error = "";

    //retrieve the selected size node
    //thank you Parthik Gosar for the code to find the currently selected radio button: https://stackoverflow.com/a/15839451
    size = document.querySelector('input[name="size"]:checked');

    //check if size option exists in the availableSizes array
    for(let i = 0; i < availableSizes.length; i++) {
        if(availableSizes[i].value === size.value) {
            console.log("success");
            break;
        }

        if(i == availableSizes.length - 1) {
            error = "Invalid size.";
            console.log("invalid size");
            return;
        }
    }

    //retrieve all selected topping nodes
    toppings = document.querySelectorAll('input[name="toppings[]"]:checked');

    //retrieve selected crust node
    crust = document.getElementById("crust");
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    getFormData();

    errorDisplay.textContent = error;

    if(error != null || "") {
        return;
    }
});
