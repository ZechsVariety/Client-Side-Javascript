//object references
const footerText = document.querySelector("footer p");

//footer data
const creatorName = "Zecheriah Ferguson";
const creatorStudentID = 200639774;

//dynamically add name and student id to footer
footerText.textContent = `Demonstration by: ${creatorName} - ${creatorStudentID}`;
