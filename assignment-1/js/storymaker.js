//objects
const tableBody = document.querySelector("table tbody");
const wordButtons = document.querySelector("#wordButtons");
const submitButton = document.querySelector("#submit");
const output = document.querySelector("#output");

//arrays
const characters = ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"];
const actions = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
const adjectives = ["funny", "scary", "goofy", "slimy", "barking", "fat"];
const animals = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
const places = ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"];

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
            //console.log(cells[i].textContent + cells[i].getAttribute("id"));

            if(cells[i].id == "selected") {
                cells[i].removeAttribute("id");
                
                //loop back to start of array if next value is blank
                if(typeof cells[i + 1] === "undefined" || cells[i + 1].textContent == "") {
                    cells[0].id = "selected";
                }
                //otherwise, set the next value to selected
                else {
                    cells[i + 1].id = "selected";
                }

                //break so that the selected id doesnt loop back around to its original placement
                break;
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
            if(item.id == "selected")
            {
                newSentence += item.textContent + " ";
                //break;
            }
        });
    }
    
    //display the new sentence
    output.textContent = newSentence;
});
