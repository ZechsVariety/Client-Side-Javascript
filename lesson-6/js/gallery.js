// DONE 1: Initialize and declare variables
const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

/* DONE 2: Loop 5 times to create the <img> elements */
for(let i = 1; i <= 6; i++) {
		/* DONE 3a: Create a new DOM node - an image element */
		const newImage = document.createElement("img");
		/* DONE 3b: Set the src attribute to be the path of one of the images inside the images folder, using setAttribute() */
		newImage.setAttribute("src", `images/pic${i}.jpg`);
		newImage.setAttribute("alt", `thumbnail image ${i}`);
		/* Append the new image element to the thumbBar div, named in STEP 1 */
		thumbBar.append(newImage);
		/* DONE 3c: Build event handler for each <img> */
		newImage.addEventListener("click", (event) => {
			console.log(event.target.src);

			displayedImage.setAttribute("src", event.target.src);
		});
}

/* STEP 4: Function to change the src of the main <img> */

	// Rewrite the src attribute of the .displayed-img element


/* DONE 5: Event Delegation
Instead of adding event handlers for each image, how about event delegation? Build a click handler on the parent element, and capture each target (and its attributes) from the event object */
thumbBar.addEventListener("click", (event) => {
	// event.target is the element that was clicked
	if(event.target && event.target.nodeName === "IMG") {
		// grab the src attribute of the element that was clicked
		console.log(event.target.src);
		// change the main image
		displayedImage.setAttribute("src", event.target.src);
	}
});

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery and https://davidwalsh.name/event-delegate
