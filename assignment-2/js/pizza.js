//objects
const footerText = document.querySelector("footer p");

const form = document.querySelector('form');
const submitButton = document.getElementById("submit");
const errorDisplay = document.getElementById("error");

//variables

//updated when form is submitted
let size, crust, customerName;
let toppings = [];

//for validation
const availableSizes = ["Small", "Medium", "Large", "Party"];
//"Secret" is an intended secret value with its own sprite
const availableToppings = ["Cheese", "Pepperoni", "Spinach", "Pickles", "Egg", "Carrots", "Sausage", "Secret"];
const availableCrusts = ["Regular", "Thin", "Deep", "Evil"];

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

    //retrieve all selected topping nodes
    toppings = document.querySelectorAll('input[name="toppings[]"]:checked');

    //retrieve selected crust node
    crust = document.getElementById("crust");

    //retrieve name
    customerName = document.getElementById("name");

    //VALIDATION

    //check if size exists in the availableSizes array
    if(!availableSizes.includes(size.value)) {
        error = `"${size.value}" is not a valid size.`;
        return;
    }

    //check if all toppings exists in the availableToppings array
    toppings.forEach(topping => {
        if(!availableToppings.includes(topping.value)) {
            error = `"${topping.value}" is not a valid topping.`;
            return;
        }
    });

    //check if crust exists in the availableCrusts array
    if(!availableCrusts.includes(crust.value)) {
        error = `"${crust.value}" is not a valid crust type.`;
        return;
    }

    console.log(customerName.value);

    //check if name is blank
    if(customerName.value == null || customerName.value == "") {
        error = `Please enter a name.`;
        return;
    }
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    getFormData();

    errorDisplay.textContent = error;

    if(error == null || error == "") {
        return;
    }
});
