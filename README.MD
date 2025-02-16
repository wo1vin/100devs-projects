# 100Devs Projects

## Description
This a simple app that acts as a repository of projects built by members of 100Devs.
Users can add projects to the database and browse through what others have created.

## Tech
- Node
- Vite
- Appwrite

## Languages
- JavaScript
- CSS3
- HTML5

### Optimizations
- Allow users to log in with their GitHub account
- Load lists of tech and languages to make form input easier
- Add attribute for projects that are requesting collaborators

## How to contribute
Contact me on Discord if you want access to the database. Otherwise, you will need your own Appwrite account, database, and collections.
1. Create an issue on this repository describing the contribution that you would like to make.
2. Fork this repo and clone it to your local machine.
    Terminal instructions:
        `git clone git@github.com:wo1vin/100devs-projects.git`
        `git install`
3. Create a .env file and the environment variables with the IDs from the Appwrite CLI:
    `# Appwrite creds`
    `VITE_PROJECT_ID = ""`
    `VITE_DB_ID = ""`
    `VITE_PRODUCTS_ID = ""`
4. Code.
5. Push the changes to your remote repo.
6. Create a pull request detailing the changes that you made.
7. Once your pull request is merged, you will have successfully contributed to this project!