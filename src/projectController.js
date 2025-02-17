// baddies writing bad code...baddies writing bad code...
import { ID } from "appwrite";
import { databases } from "./main";

// This file provides the functionality for handling data to and from the projects collection

// PROJECT LIST
async function addProjectsToDom(){

  // clear out the DOM so that it fetches an accurate list
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = "";

  // GET projects
  let data = await databases.listDocuments(
    import.meta.env.VITE_DB_ID,
    import.meta.env.VITE_PROJECTS_COL_ID
  );
  // console.log(data); // array of objects

  // create a DIV.CARD for each document and add it to the project list div.
  // EXAMPLE OUTPUT:
  // <div class="card">
    // <h3>flim</h3>
    // <a href="http://localhost:5173/">Link to project</a>
    // <a href="http://localhost:5173/">Link to repo</a>
    // <p>kusdhrtikluh3w iuhfwilu ffhli</p>
    // <h4>Stack</h4>
    // <ul class="stack">
      // <li>js</li>
      // <li> vite</li>
    // </ul>
    // <p>Added on 2/15/2025</p>
    // <ul class="contributors">
      // <li></li>
    // </ul>
    // <ul class="type-of-project"></ul>
    // <p>Closed for contributions</p>
    // <p>Status: Not finished</p>
  // </div>
  data.documents.forEach(project => {
 
    // create an element for each document
    const card = document.createElement('div')
    card.classList.add('card');

    // Add project name
    const projectName = document.createElement('h3');
    projectName.textContent = project['project-name'];
    card.appendChild(projectName);

    // Add description
    const description = document.createElement('p');
    description.textContent = project['description'];
    card.appendChild(description);

    // Add stack section
    const stackHeading = document.createElement('h4');
    stackHeading.textContent = "Stack";
    card.appendChild(stackHeading);

    const stackList = document.createElement('ul');
    stackList.classList.add('stack');
    project['stack'].forEach((tech) => {
      const stackItem = document.createElement('li');
      stackItem.textContent = tech;
      stackList.appendChild(stackItem);
    });
    card.appendChild(stackList);

    // Add project type section 
    const typeHeading = document.createElement('h4');
    typeHeading.textContent = "Type of project";
    card.appendChild(typeHeading);

    const projectTypeList = document.createElement('ul');
    projectTypeList.classList.add('type-of-project');
    project['type-of-project'].forEach((type) => {
      const item = document.createElement('li');
      item.textContent = type;
      projectTypeList.appendChild(item);
    });
    card.appendChild(projectTypeList);

    // Add contributors section
    const contributorHeading = document.createElement('h4');
    contributorHeading.textContent = "Contributors";
    card.appendChild(contributorHeading);

    const contributorsList = document.createElement('ul');
    contributorsList.classList.add('contributors');
    project.contributors.forEach((contributor) => {
      const contributorItem = document.createElement('li');
      contributorItem.textContent = contributor;
      contributorsList.appendChild(contributorItem);
    });
    card.appendChild(contributorsList);

    // Add a container for links
    const links = document.createElement('div');
    links.classList.add('projectLinks');
    card.appendChild(links);
    // Add project link
    const projectLink = document.createElement('a');
    projectLink.href = project['project-link'];
    projectLink.textContent = 'Link to project';
    links.appendChild(projectLink);

    // Add GitHub link
    const githubLink = document.createElement('a');
    githubLink.href = project['github-link'];
    githubLink.textContent = 'Link to repo';
    links.appendChild(githubLink);

    // Add date added
    // const dateAdded = document.createElement('p');
    // dateAdded.textContent = `Added on ${project['date-added']}`;
    // card.appendChild(dateAdded);


    // THE FOLLOWING TWO ATTRIBUTES NEED THE PROPER INPUT ON THE FRONTEND. THEY'VE BEEN ADDED TO THE DB ATTRIBUTES | DELETE THIS IF DONE
    // Add open/closed status
    
    const collabStatus = document.createElement('p');
    collabStatus.textContent = `${project['open'] === true ? "Open" : "Not open"} for contributions`
    card.appendChild(collabStatus);

    // Add finished status
    const completionStatus = document.createElement('p');
    completionStatus.textContent = project['completed'] == true ? 'Completed' : 'work in progress';
    card.appendChild(completionStatus);

    // console.log(card);
    document.getElementById('projectList').appendChild(card);
  });


};
addProjectsToDom();

// PROJECT FORM
// create event listener for project form
const form = document.getElementById('project-form'); 
    form.addEventListener('submit', function(e){
        e.preventDefault(); 

        getCheckboxValues()
        addProject(e)
        form.reset()
    });

// When the checkbox is checked, show the text input. otherwise, hide it. 
const otherCheckbox = document.getElementById('otherCheckbox');
const otherText = document.getElementById('otherText');

otherCheckbox.addEventListener('change', function() {
  if (this.checked) {
    otherText.style.display = 'inline';
  } else {
    otherText.style.display = 'none';
    otherText.value = ''; // Clear the text field when unchecked
  }
});

// creating storage for future use
let projectType = "";

// collect the selected checkbox values, including the "other" value if entered.
function getCheckboxValues(){

  const selectedOptions = [];
  const checkboxes = document.querySelectorAll('input[name="projectType"]:checked');
  checkboxes.forEach(checkbox => {
    if (checkbox.value === 'other') {
      selectedOptions.push(otherText.value); // Add the text input value
    } else {
      selectedOptions.push(checkbox.value);
    }
  });
  projectType = selectedOptions.join(","); 
};

// POST project to DB
// if a new project has been submitted, the DOM should be updated
function addProject(e){
    //create new project
    const project = databases.createDocument(
    import.meta.env.VITE_DB_ID,
    import.meta.env.VITE_PROJECTS_COL_ID,
    ID.unique(),{ 
        "project-name": e.target.projectName.value,
        "date-added": new Date().toLocaleDateString(),
        "project-link": e.target.projectLink.value,
        "github-link": e.target.githubLink.value,
        "description":e.target.description.value,
        "stack": splitByCommas(e.target.stack.value),
        "type-of-project": splitByCommas(projectType),
        "contributors": splitByCommas(e.target.contributors.value),
        "open": e.target.open.value === "true" ? true : false,
        "completed":e.target.completed.value === "true" ? true : false,
    })
    project.then (function(response) {
      addProjectsToDom()
      // console.log(response);
    }, function(err) {
      console.log(err);
    });
}

// splits the strings by the commas and cleans up the spaces
function splitByCommas(string){
  const arr = string.split(",").map(x=>x.trim());
  return arr;
}