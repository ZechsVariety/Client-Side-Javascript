//objects
const tableBody = document.querySelector("table tbody");
const wordButtons = document.querySelector("#wordButtons");
const randomButton = document.querySelector("#random");
const submitButton = document.querySelector("#submit");
const output = document.querySelector("#output");

//arrays
const characters = ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat", "The hero", "The villain", "My friend", "Jerma"];
const actions = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed", "slapped", "got eaten by", "is scared of", "is in love with"];
const adjectives = ["funny", "scary", "goofy", "slimy", "barking", "fat", "giant", "tiny", "bald", "stinky"];
const animals = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm", "rat", "person"];
const places = ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes", "around the corner", "in my class", "in the woods", "two times in a row"];

//other
const columnCount = 5;

//run through each array
characters.forEach((item, index) => {
    populateColumn(item, index, 0);
});
actions.forEach((item, index) => {
    populateColumn(item, index, 1);
});
adjectives.forEach((item, index) => {
    //all adjectives add "a" at the start
    populateColumn("a " + item, index, 2);
});
animals.forEach((item, index) => {
    populateColumn(item, index, 3);
});
places.forEach((item, index) => {
    populateColumn(item, index, 4);
});

//this function adds an item to its correct cell, dynamically creating rows/cells if needed
function populateColumn(item, index, column) {
    let rows = tableBody.querySelectorAll("tr");

    //check if a tr at this index exists, and create one if not
    //thank you techfoobar: https://stackoverflow.com/questions/13107855/how-to-check-if-an-array-index-exists-or-not-in-javascript
    if(typeof rows[index] === "undefined") {
        //console.log(`Row ${index} does not exist! Creating now with 5 empty cells...`);

        //create new row
        const newRow = document.createElement("tr");

        //add 5 empty cells to the new row
        for(let i = 0; i < columnCount; i++) {
            const newCell = document.createElement("td");
            newRow.append(newCell);
        }

        //set table body as the new row's parent
        tableBody.append(newRow);

        //redo the rows list
        rows = tableBody.querySelectorAll("tr");
    }

    const cells = rows[index].querySelectorAll("td");

    //add this item to the corresponding cell
    cells[column].textContent = item;
    //console.log(cells[column].textContent);
}

//any of the word buttons are clicked
wordButtons.addEventListener("click", (event) => {
    //check that it was infact a button that was clicked
	if(event.target && event.target.nodeName === "BUTTON") {
        const targetColumn = event.target.textContent;
		//console.log(targetColumn);

        //const rows = tableBody.querySelectorAll("tr");
        //const cells = rows[target].querySelectorAll("td");

        //find all cells in the correct column
        const cells = tableBody.querySelectorAll(`tr td:nth-of-type(${targetColumn})`);
        //console.log(cells);

        //run through each cell in the column to reassign selected cell
        for(let i = 0; i < cells.length; i++) {
            //console.log(cells[i].textContent + cells[i].getAttribute("class"));
            //console.log(cells[i].textContent + cells[i].className);

            if(cells[i].className == "selected") {
                cells[i].removeAttribute("class");
                
                //loop back to start of array if next value is blank
                if(typeof cells[i + 1] === "undefined" || cells[i + 1].textContent == "") {
                    cells[0].className = "selected";
                }
                //otherwise, set the next value to selected
                else {
                    cells[i + 1].className = "selected";
                }

                //break so that the selected class doesnt loop back around to its original placement
                break;
            }
        }
	}
});

//randomize pressed
randomButton.addEventListener("click", (event) => {
    let randoms = [];
    
    //retrieve columns and set random values
    let columns = [];
    for(let i = 0; i < columnCount; i++)
    {
        columns.push(tableBody.querySelectorAll(`tr td:nth-of-type(${i + 1})`));
        
        //add a random index to the randoms array
        //thank you mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        randoms.push(Math.floor(Math.random() * columns[i].length));
    }

    //console.log(randoms);

    //run through each column and set the cell with the random index to selected
    for(let i = 0; i < columns.length; i++) {
        const cells = tableBody.querySelectorAll(`tr td:nth-of-type(${i + 1})`);

        //run through each cell in the column
        for(let j = 0; j < columns[i].length; j++) {
            //console.log("j: " + j + "\nrandom: " + randoms[i])
            //check if the index matches the random one
            if(j == randoms[i]) {
                //if the cell is blank, set the previous cell to selected (this technically means the last cell followed by a blank has the highest chance but whatever)
                if(cells[j].textContent == "") {
                    //reduce random by 1
                    randoms[i] = randoms[i] - 1;
                    //put j back 2 times to ensure it goes over this value again
                    j -= 2;
                    //cells[j - 1].id = "selected";
                }
                //otherwise, set this cell to selected
                else
                    cells[j].className = "selected";
            }
            //remove selected from other cells
            else if(cells[j].className == "selected") {
                cells[j].removeAttribute("class");
            }
        }
    }
});

//playback pressed
submitButton.addEventListener("click", (event) => {
    //const columnCount = tableBody.querySelectorAll(`tr:nth-of-type(${0}) td`).length;

    //retrieve columns
    //ideally this would be its own function but id have to refactor the previous code to include it so im just keeping it like this
    let columns = [];
    for(let i = 0; i < columnCount; i++)
    {
        columns.push(tableBody.querySelectorAll(`tr td:nth-of-type(${i + 1})`));
        //console.log(columns[i]);
    }
    //console.log(columns);

    let newSentence = "";

    //run through each column and add the selected cell to the new sentence
    for(let i = 0; i < columnCount; i++)
    {
        columns[i].forEach((item) => {
            if(item.className == "selected")
            {
                newSentence += item.textContent + " ";
                //break;
            }
        });
    }
    
    //display the new sentence
    output.textContent = newSentence;
});
