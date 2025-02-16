import './style.css';
import { Client, Databases, ID } from "appwrite";

// Appwrite DB config
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_PROJECT_ID); 

export const databases = new Databases( client );


// navbar button display toggle
// Get references to the buttons and divs
const infoBtn = document.getElementById('infoBtn');
const addProjectBtn = document.getElementById('addProjectBtn');
const infoDiv = document.getElementById('info');
const addProjectDiv = document.getElementById('addProject');

// Toggle function for "Learn more" button
infoBtn.addEventListener('click', () => {
  if (infoDiv.style.display === 'none' || infoDiv.style.display === '') {
    infoDiv.style.display = 'block'; // Show the div
    addProjectDiv.style.display = 'none'; // Hide the other div
  } else {
    infoDiv.style.display = 'none'; // Hide the div
  }
});

// Toggle function for "Add a project" button
addProjectBtn.addEventListener('click', () => {
  if (addProjectDiv.style.display === 'none' || addProjectDiv.style.display === '') {
    addProjectDiv.style.display = 'block'; // Show the div
    infoDiv.style.display = 'none'; // Hide the other div
  } else {
    addProjectDiv.style.display = 'none'; // Hide the div
  }
});

// set credit in footer
// const currentYear = new Date().getFullYear();
// let credit = document.getElementById("credits");
// credit.innerHTML = `&copy ${currentYear}`;