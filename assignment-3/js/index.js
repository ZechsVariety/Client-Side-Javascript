//object references
const footerText = document.querySelector("footer p");
const videoSection = document.querySelector("section");

//footer data
const creatorName = "Zecheriah Ferguson";
const creatorStudentID = 200639774;

//modifiers
const descCharacterCount = 200;

//dynamically add name and student id to footer
footerText.textContent = `Demonstration by: ${creatorName} - ${creatorStudentID}`;

//this url was generated using https://developers.google.com/youtube/v3/docs/playlistItems/list
fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLOSODkKpkvaQQd0AFDbe2vNvfRhhLAz6a&key=AIzaSyCSOE1xMZVew7RUii8E24JSRfXLQi4C9Gs")
    //get response
    .then(response => {
        console.log(response);

        //true/false if response is good
        if(!response.ok) {
            throw new Error("Could not fetch videos");
        }

        return response.json();
    })
    //if response is okay, get and use json
    .then(json => {
        console.log(json);

        //clear videoSection. "loading..." is displayed until this occurs
        videoSection.innerHTML = "";

        //run through each video that was retrieved
        json.items.forEach(video => {
            //retrieve relevant values

            let videoUrl = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}&list=PLOSODkKpkvaQQd0AFDbe2vNvfRhhLAz6a`; //grab url from within playlist
            let rankingNum = video.snippet.position + 1; //+1 makes the first index 1 instead of 0
            let thumbnail = video.snippet.thumbnails.standard.url; //standard quality
            let title = video.snippet.title;

            let fullDesc = video.snippet.description;
            //truncate the description so that it doesn't take up a huge portion of the page
            //thank you Shad for solution using substring: https://stackoverflow.com/a/7708849
            let truncatedDesc = fullDesc.substring(0, descCharacterCount) + "...";

            let date = video.snippet.publishedAt;
            let formattedDate = date.split("T")[0]; //remove the time portion (beyond "T"). ex: "2024-04-05T01:08:29Z" becomes just "2024-04-05"

            //update visually
            videoSection.innerHTML += 
            `<div>` +
                `<a target="_blank" href="${videoUrl}">` + //make all child elements clickable (redirects to video url in new tab)
                    `<h3>#${rankingNum}: ${title}</h3>` + //display ranking and title as an h3
                    `<img src="${thumbnail}" />` + //show thumbnail image
                `</a>` +
                `<div>` +
                    `<div class="videoInfo"><h4>Publish date:</h4><p>${formattedDate}</p></div>` + //date
                    `<div class="videoInfo"><h4>Description:</h4><p>${truncatedDesc}</p></div>` + //description
                `</div>` +
            `</div>`;
        });
    })
    //error handling (for if you have no internet, or if response throws an error indicating that youtube servers must be down)
    .catch(error => {
        console.log(error);

        //display error
        videoSection.innerHTML = "<h3>ERROR: Could not fetch videos! Check your internet connection.</h3>";
    })
;
