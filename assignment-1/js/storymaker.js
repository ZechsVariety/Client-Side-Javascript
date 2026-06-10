//objects
const tableBody = document.querySelector("table tbody");

//arrays
const characters = ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"];
const actions = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
const adjectives = ["funny", "scary", "goofy", "slimy", "barking", "fat"];
const animals = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
const places = ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"];

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
        console.log(`Row ${index} does not exist! Creating now with 5 empty cells...`);

        //create new row
        const newRow = document.createElement("tr");

        //add 5 empty cells to the new row
        for(let i = 0; i < 5; i++) {
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
