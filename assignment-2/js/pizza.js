//objects
const footerText = document.querySelector("footer p");
const visualsDiv = document.getElementById("visuals");
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
const availableToppings = ["Cheese", "Spinach", "Pepperoni", "Pickles", "Egg", "Carrots", "Sausage", "Secret"];
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

    //remove any pizza visuals that already exist
    let child = visualsDiv.firstChild;
    if(child) {
        visualsDiv.removeChild(child);
    }

    //create and append new pizza visual
    visualsDiv.appendChild(pizza.buildPizza());
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

    //create the pizza visual. returns a div element that contains all the images
    //NOTE: each img's layering (zindex) depends on when it is created, so I didn't have to manually update the zindexes like I originally thought
    buildPizza() {
        //contains all the images
        let group = document.createElement("div");
        //thank you Peter Boughton for the solution to adding a class to an element with JS: https://stackoverflow.com/a/196038
        group.classList.add("pizza");

        //determine the image size (px)
        let imgSize;
        switch (this.size) {
            case "Small":
                imgSize = 100;
                break;

            case "Medium":
                imgSize = 128;
                break;
            
            case "Large":
                imgSize = 170;
                break;
            
            case "Party":
                imgSize = 300;
                break;
        
            default:
                imgSize = 128;
                break;
        }

        //create crust image and set its image, size, and alt text, add it to pizzaImg class, and append it to the group
        let crustImg = document.createElement("img");
        crustImg.src = `./images/Crust${this.crust}.png`;
        crustImg.width = imgSize;
        crustImg.alt = `${this.crust} crust image`;
        crustImg.classList.add("pizzaImg");
        group.appendChild(crustImg);

        //create each topping image and set their images, sizes, and alt texts, add it to pizzaImg class, and append them all to the group
        let toppingImgs = [];
        for(let i = 0; i < this.toppings.length; i++) {
            toppingImgs[i] = document.createElement("img");
            toppingImgs[i].src = `./images/Topping${this.toppings[i]}.png`;
            toppingImgs[i].width = imgSize;
            toppingImgs[i].alt = `${this.toppings[i]} topping image`;
            toppingImgs[i].classList.add("pizzaImg");
            group.appendChild(toppingImgs[i]);
        }

        //return the parent div containing all the images
        return group;
    }
}
