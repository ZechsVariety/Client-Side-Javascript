const output = document.querySelector('body p:nth-of-type(2)');

/* DONE 1: Creating an array
When declaring and initializing an array, you can include strings, numbers, booleans, and even other arrays */
//let myArray = new Array;
let myArray = ["string", true, 100, [5, "hello"]];
/* STEP 2: Reading and changing array elements
You can refer to a particular element in an array with it's index number */
myArray[1] = false;
myArray[3][0] = 6;
// ? ${} only works with the backtick (`)
output.textContent = `awesome ${String(myArray[2])}`;
output.textContent = "awesome ${String(myArray[2])}";
// You can also change a particular element

// An array within an array is called a multidimensional array - it can be accessed by specifying the index of the first array, then the item within it
/* STEP 3: Determining array length
Being able to figure out how many elements are contained in an array is a critical feature of JavaScript programming */
// ? .length
// In particular, looping through arrays

/* STEP 4: Convert a string to an array
If there is a common character that can act as a delimiter in a string, we can use this character to create an array */
// ? .split([delimiter])
// Output one of the array items

// Output the last element of the array
// ? either array[array.length - 1] or array.at(-1)
/* STEP 5: Convert an array back to a string
Use join() and toString() - note that join() allows you to choose and insert a delimiter, while toString() does not */

/* STEP 6: Adding and removing items from an array
Without the ability to edit the contents of an array, this type of variable would have limited use - but adding and removing array items is pretty straightforward */

// Adding one or more items to an array with push()

// If you would like to capture how many elements are in the array after you have edited it, then…
// ? push adds these to the end of the array and returns the new length of the array
let numItems = myArray.push("item 1", "item 2");
// Removing an item from an array with pop()
// ? pop removes last item
// ? itemRemoved returns whichever item you removed
let itemRemoved = myArray.pop();
// pop() returns the item that was removed, rather than the length of the updated array, so…

// To do the same thing, that is, to add and remove an item from the beginning of the array, use shift() and unshift()
// ? shift moves everything left, so the first item is now -1 and thus deleted (and returned)
let removedItem = myArray.shift();
numItems = myArray.unshift("idk", "idk 2");
// We can also modify the array contents by deleting or substituting elements, or inserting one or more elements at a certain place with splice()
// ? splice: index, how many to replace, what it will be replaced by
myArray.splice(3, 1, "yaba");
/* That's it for the basics of working with arrays! With these tools at your disposal, a whole new world of possibilities with JavaScript are at your command */