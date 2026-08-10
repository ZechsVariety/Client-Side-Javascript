//object references
const footerText = document.querySelector("footer p");
const videoSection = document.querySelector("section");

//footer data
const creatorName = "Zecheriah Ferguson";
const creatorStudentID = 200639774;

//dynamically add name and student id to footer
footerText.textContent = `Demonstration by: ${creatorName} - ${creatorStudentID}`;

//this url was generated using https://developers.google.com/youtube/v3/docs/playlistItems/list
fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=PLOSODkKpkvaQQd0AFDbe2vNvfRhhLAz6a&key=AIzaSyCSOE1xMZVew7RUii8E24JSRfXLQi4C9Gs")
    .then(result => result.json())
    .then(json => {
        //run through each video that was retrieved
        json.items.forEach(video => {
            //add video title as an h3 element
            videoSection.innerHTML += `<h3>${video.snippet.title}</h3>`;
        });
    }
);
