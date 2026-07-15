const output = document.querySelector("#output");

/* STEP 1: Instead of a constructor function, let's try a JavaScript class called 'Coffee' */
class Coffee {
    size;
    isDecaf;
    isEvil = false;

    constructor(size, isDecaf, isEvil) {
        this.size = size;
        this.isDecaf = isDecaf;
        this.isEvil = isEvil;
    }

    // add a serveIt method
    serveIt() {
        // Generate an IMG of the coffee ordered
        let cup = document.createElement("img");

        // Set the src path for the IMG element
        cup.setAttribute("src", "images/coffee-cup.svg");

        // Determine caffeine status of the coffee
        if(this.isDecaf) {
            cup.src = "images/coffee-cup-green.svg";
        } else {
            cup.src = "images/coffee-cup-purple.svg";
        }

        // Set the size of the cup SVG image based on this.size
        switch (this.size) {
            // Size the IMG in terms of its height based on above number from the switch
            case "compact":
                cup.height = 20;
                break;
            case "small":
                cup.height = 100;
                break;
            case "medium":
                cup.height = 150;
                break;
            case "large":
                cup.height = 200;
                break;
            default:
                cup.height = 150;
        }

        // Generate a description of the coffee and put it into the IMG title attribute
        cup.title = `A ${this.size} ${this.isDecaf ? "decaf" : "caffeinated"}${this.isEvil ? " evil" : ""} coffee.`;

        // Insert the new IMG element into the paragraph
        output.appendChild(cup);
    }
}

/* DONE 2: Instatiate a coffee based on the above constructor function */
let zechsCoffee = new Coffee("medium", false, false);
let evilZechsCoffee = new Coffee("medium", false, true);
let jermasCoffee = new Coffee("compact", true, false);
let stersCoffee = new Coffee("small", true, false);

/* DONE 3: Add a method to the Coffee class called serveIt() */

/* DONE 4: Call up the serveIt() method */
zechsCoffee.serveIt();
jermasCoffee.serveIt();
stersCoffee.serveIt();
evilZechsCoffee.serveIt();

/* DONE 5: Define a subclass of the Coffee class */
class Latte extends Coffee{
    milktype;

    constructor(size, isDecaf, milkType) {
        super(size, isDecaf);
        this.milkType = milkType;
    }

    latteDesc() {
        return `A ${this.size} ${this.isDecaf ? "decaf" : "caffeinated"} latte with ${this.milkType} milk.`;
    }
}

/* DONE 6: Create a new instance of the Latte object */
let zechsLatte = new Latte("large", false, "2%");

/* STEP 7: Call up the latteDesc() method for the above created Latte instance */
zechsLatte.latteDesc();
zechsLatte.serveIt();

/* STEP 8: Create yet another instance of Latte using the console, and try the latteDesc() method from the subclass, as well as the serveIt() method from the parent class */

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript

// Special thanks to https://openclipart.org/detail/293550/coffee-to-go for the very cool coffee cup SVG
