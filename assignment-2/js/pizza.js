//objects
const footerText = document.querySelector("footer p");
const pizzaDesc = document.getElementById("desc");

const form = document.querySelector('form');
const submitButton = document.getElementById("submit");
const errorDisplay = document.getElementById("error");

//variables

//updated when form is submitted
let size, crust, customerName;
let toppings = [];

//allowed values for form validation
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

    //check if name is blank
    if(customerName.value == null || customerName.value == "") {
        error = `Please enter a name.`;
        return;
    }

    //if site reaches this point, it means there were no errors.
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    getFormData();

    errorDisplay.textContent = error;

    //stop if there's an error
    if(error != null && error != "") {
        return;
    }

    //create pizza object
    let pizza = new Pizza(size, toppings, crust, customerName);

    pizzaDesc.textContent = pizza.description();
});

//pizza class
class Pizza {
    size;
    toppings = [];
    crust;
    customerName;

    constructor(size, toppings, crust, customerName) {
        this.size = size.value;

        //add each element individually so that this is a proper copy of the toppings array
        for(let i = 0; i < toppings.length; i++) {
            this.toppings[i] = toppings[i].value;
        }

        this.crust = crust.value;
        this.customerName = customerName.value;
    }

    //returns string
    description() {
        //toppings list portion of the description dynamically adds commas, "and", and "nothing" depending on how many toppings are selected
        let toppingsList = "";
        //if no toppings are selected, the topping part should say "nothing"
        if(this.toppings.length == 0) {
            toppingsList = "nothing";
        }
        //otherwise
        else {
            //look through each selected topping
            for(let i = 0; i < this.toppings.length; i++) {
                //if this is the last element, add "and" beforehand (unless it is the only element in the list)
                if(i == this.toppings.length - 1 && this.toppings.length > 1) {
                    toppingsList += " and ";
                }
                //otherwise, if this isn't the first element, add a comma beforehand
                else if(i != 0) {
                    toppingsList += ", ";
                }

                toppingsList += this.toppings[i].toLowerCase();
            }
        }

        //return the description
        return `${this.customerName.toLowerCase()}'s ${this.size.toLowerCase()}-size pizza, with ${toppingsList} on top, and with a ${this.crust.toLowerCase()} crust.`;
    }
}
