//object references
const footerText = document.querySelector("footer p");
const videoSection = document.querySelector("section");

//footer data
const creatorName = "Zecheriah Ferguson";
const creatorStudentID = 200639774;

//dynamically add name and student id to footer
footerText.textContent = `Demonstration by: ${creatorName} - ${creatorStudentID}`;

//this url was generated using https://developers.google.com/youtube/v3/docs/playlistItems/list
//TODO: change max results to be a variable rather than a hardcoded 15
fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=PLOSODkKpkvaQQd0AFDbe2vNvfRhhLAz6a&key=AIzaSyCSOE1xMZVew7RUii8E24JSRfXLQi4C9Gs")
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
            videoSection.innerHTML += 
            `<a target="_blank" href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}">` + //make all child elements clickable (redirects to video url in new tab)
                `<img src="${video.snippet.thumbnails.standard.url}" />` + //show thumbnail image
                `<h3>${video.snippet.title}</h3>` + //add video title as an h3 element
            `</a>`;
        });
    })
    //error handling (for if you have no internet, or if response throws an error indicating that youtube servers must be down)
    .catch(error => {
        console.log(error);

        //display error
        videoSection.innerHTML = "<h3>ERROR: Could not fetch videos! Check your internet connection.</h3>";
    });
