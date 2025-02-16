// baddies writing bad code...baddies writing bad code...
import { ID } from "appwrite";
import { databases } from "./main";

// create event listener for product form
const form = document.getElementById('project-form'); 
    form.addEventListener('submit', function(e){
        e.preventDefault(); 

        getCheckboxValues()
        addJob(e)
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

// addJob to DB
function addJob(e){
    //create new project
    console.log(e.target)
    const promise = databases.createDocument(
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
    });

    promise.then (function(response) {
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

