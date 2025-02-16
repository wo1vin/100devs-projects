// baddies writing bad code...baddies writing bad code...
import { ID } from "appwrite";
import { databases } from "./main";

// This file provides the functionality for handling data to and from the products collection

// PROJECT LIST
async function addProjectsToDom(){

  // clear out the DOM so that it fetches an accurate list
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = "";

  // GET projects
  let data = await databases.listDocuments(
    import.meta.env.VITE_DB_ID,
    import.meta.env.VITE_PRODUCTS_ID
  );
  // create an li for each document and add it to the project list ul
  data.documents.forEach(project => {
    const li = document.createElement('li')
    li.textContent = `${project['project-name']}`
    projectList.appendChild(li);
  })
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
    console.log(e.target)
    const project = databases.createDocument(
    import.meta.env.VITE_DB_ID,
    import.meta.env.VITE_PRODUCTS_ID,
    ID.unique(),{ 
        "project-name": e.target.projectName.value,
        "date-added": new Date().toLocaleDateString(),
        "project-link": e.target.projectLink.value,
        "github-link": e.target.githubLink.value,
        "description":e.target.description.value,
        "stack": splitByCommas(e.target.stack.value),
        "type-of-project": splitByCommas(projectType),
        "contributors": splitByCommas(e.target.contributors.value)
    })
    project.then (function(response) {
      addProjectsToDom()
      console.log(response);
    }, function(err) {
      console.log(err);
    });
}

// splits the strings by the commas and cleans up the spaces
function splitByCommas(string){
  const arr = string.split(",").map(x=>x.trim());
  return arr;
}