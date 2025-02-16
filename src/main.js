import './style.css';
import { Client, Databases, ID } from "appwrite";

// Appwrite DB config
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_PROJECT_ID); 

export const databases = new Databases( client );

