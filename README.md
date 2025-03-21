# Gloomhaven Helper
Gloomhaven Helper is a fullstack application for managing characters, heroes & stats, and in the future, the ability to create & customize your favorite decks, i.e, building your favorite decks for future games. It's also to include a "rule searching" function, allowing the players to quickly and in real-time find the specific rule they are looking for. 

This project includes both a frontend (React + Typescript) and a backend (Express + MongoDB & Typescript). 


## Project Overview
This project is a work in progress, but already includes complete flows for:
- User registration and login
- Hero selection (one time setup)
- Display of user account information
- Token based authentication

I have striven to follow and maintain a structured and documented development process. In order to achieve this, I have been using:
- A detailed project plan in Word format (included in the /docs folder)
- GitHub projects to track tasks and progress throughout the process

The project is built for future scalability, and I will continue working on:
- Scenario tracking and progression
- Deck builder functionality
- Rule searching: This is still a work-in-progress, but me and friends plan to implement a smart search feature for Gloomhaven rules. This will combine embedded rule data with ChatGPT-powered responses to offer fast and highly contextual answers to player questions.


## Techniques, programs and dependencies used primarily:
Frontend: React, Typescript, Redux Toolkit
Backend: Node.js, Express, Typescript
Database: MongoDB Atlas (Cloud)


## Folder Structure
I have aspired to keep the "seperation of tasks" principle as much as possible, as well as relying on an MVC-like structure for backend. Thus, my project is divided into backend/frontend as such:
GLOOMHAVENHELPER (root, repository)
/src (backend)
/frontend/src (frontend)

### Backend: 
As previously mentioned, I have aspired to track the MVC-model as much as possible. 
config; database connection & .env-variables
controllers; the bridge between models, routes and database communication
middleware; json webtoken authentication
models; models corresponding to gloomhaven relevant objects
resources; a folder containing endpoints, model templates, gloomhaven images and the gloomhaven rulebook
routes; the endpoints & imported functions corresponding to the controllers and connected via express router

server.ts: the main execution file

### Frontend:
On the frontend side, I have aspired as much as possible to seperate tasks. For a project this size, this might in the end prove unecessary. But for learning purposes, I feel this was most apt. 
api; api-related frontend calls. this is where the connection to the backend endpoints is exported to the rest of the project
components; reusable react components, tsx-files since the project is typescript-based
pages; pages, seperated from components as they change the whole view and are not reusable
redux/slices/authSlice; the primary redux file for updating and passing states. 'auth' symbolizes the fact that these states are all authorization, i.e. user, related. 
redux/thunks/authThunks; an example of the seperation of tasks I mentioned. thunks are async functions that are used for dispatching updated states to the redux store, and thus in turn imports the API functions mentioned above
redux/store.ts; the redux store. used to wrap the project in order to be able to use hooks correctly, which are typed and exported in the same file
styles; the global SCSS-files used for the project
types; backend-inspired Typescript typing, for relevant models and/or API-responses


## IMPORTANT: HOW TO RUN PROJECT LOCALLY
1) clone the project
2) install dependencies via npm install, on both backend and frontend
3) set up environment variables, in the repository root folder, create a .env file (or use the provided .env.example with the following: MONGO_URI=mongodb+srv://opponent:sLL4C8NCtEn1JTMN@helloworldcluster.gkjy1pi.mongodb.net/gloomhavenhelper?retryWrites=true&w=majority&appName=HelloWorldCluster
PORT=5000
JWT_SECRET=very_secret_just_you_wait

You can use the provided test MongoDB user credentials:
username: opponent
password: sLL4C8NCtEn1JTMN

4) Start the backend, cd gloomhavenhelper(repo root level) -> npm run dev
5) Start the frontend, cd frontend -> npm run dev

Once both servers are working, you should be able to test:
- [ ] Register a new user and verify a token is returned and stored in localStorage
- [ ] Login with an existing account and confirm redirection to hero selection
- [ ] Choose a hero and ensure it creates a new character tied to the logged-in user
- [ ] Navigate to `/account` and verify user data is correctly rendered
- [ ] Use the logout button in the navbar and confirm redirection to login
- [ ] Refresh the page and check persistent authentication works as long as token is valid
- [ ] Attempt to select a hero while logged out (should be denied with 401 Unauthorized)
- [ ] Optional: Use the provided test account to verify full flow without registration


Author:

Joel Keskitalo, 
Folkuniversitet Göteborg

