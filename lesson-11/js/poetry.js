// ALREADY DONE 1: Grab the HTML elements we need for the interaction
const verseChoose = document.querySelector("#verse-choose");
const pre = document.querySelector("pre");

// DONE 2: Build out the event handler for the SELECT element
//click would technically work too, but itd fire the event every single time you click the dropdown
verseChoose.addEventListener("change", function() {
    console.log("even occurred");
    let selectedVerse = verseChoose.value;

    updateDisplay(selectedVerse);
});

// DONE 3: Construct updateDisplay() function
function updateDisplay(verse) {
    // DONE 4: Declare and initialize URL to point to text file(s)
    let url = `https://zechsvariety.github.io/Client-Side-Javascript/lesson-11/${verse}.txt`;

    // DONE 5: Build fetch() with promises
    // DONE 5a: Use fetch and pass in the URL
    fetch(url)
        // DONE 5b: The fetch() will return a promise - which when received from the server, the promise's then() event handler is called using the response
        .then(response => {
            console.log(response);

            // DONE 5c: If the response is not okay, throw an error containing the HTTP status
            //true/false if response is good
            if(!response.ok) {
                throw new Error("Error Occurred!");
            }

            // DONE 5d: If the response is okay, the handler fetches the response and returns it as text with response.text()
            return response.text();
        })
        // DONE 5e: Once response.text() has returned a value, the then() handler can pass in the text string to the textContent property of the poemDisplay element
        .then((txt) => {
            pre.textContent = txt;
        })
        // DONE 5f: Finish the chain with a catch() to grab any errors that may have been thrown by the promise, and display them on the page
        .catch((error) => {
            pre.textContent = error;
        });
}

// DONE 6: Initialize the app with Verse 1
updateDisplay("verse1");

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
