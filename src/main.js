import './style.css';
import { Client, Databases, ID } from "appwrite";

// Appwrite DB config
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67b0fe6c000638596a1b'); 

const databases = new Databases( client );

// create new project
const promise = databases.createDocument(
  '67b0ffe400126ed76eb1',
  '67b0fff7002f5ba7da94',
  ID.unique(),
  { "project-name": "100Devs Projects",
    "date-added": new Date(),
    "project-link":"https://appwrite.io/docs",
    "github-link":"https://appwrite.io/docs",
    "description":"Repository of projects created by 100Devs members.",
    "stack":["Vite","JavaScript","React","Appwrite"],
    "image":"https://appwrite.io/docs",
    "type-of-project":"other",
    "contributors":["67b12390000cfb230b69"]
  }
);

promise.then (function(response) {
  console.log(response);
}, function(err) {
  console.log(err);
});