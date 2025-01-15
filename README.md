RandomThoughts
A web application for sharing and viewing random thoughts. This project is built with React for the client-side and Node.jswith Express for the server-side, connected to MongoDB for data storage.

Prerequisites
Node.js

npm or yarn

MongoDB

Setup
Clone the repository
bash
git clone https://github.com/yourusername/RandomThoughts.git
cd RandomThoughts
Install Dependencies
Client
Navigate to the client directory and install the necessary dependencies.

bash
cd client
yarn install
Server
Navigate to the server directory and install the necessary dependencies.

bash
cd ../server
npm install
Environment Variables
Create a .env file in the server directory and add your MongoDB URI.

MONGO_URI=<your_mongo_uri>
Running the Application
Client
To run the client, navigate to the client directory and start the development server.

bash
cd client
yarn start
Server
To run the server, navigate to the server directory and start the server.

bash
cd ../server
node server.js


API Endpoints
POST /api/post-thought
Creates a new thought.

Request Body:

json
{
  "thought": "Your thought here"
}
Response:

200 OK if the thought is successfully saved.

400 Bad Request if the input validation fails.

500 Internal Server Error if there is a server error.

GET /api/read-thought
Fetches a random thought.

Response:

200 OK with a random thought.

404 Not Found if no thoughts are found.

500 Internal Server Error if there is a server error.

Extra npm Packages
Make sure to install these additional npm packages:

bash
npm install express mongoose body-parser express-validator dotenv express-rate-limit
Folder Structure
RandomThoughts/
├── client/
│   ├── build/
│   ├── public/
│   └── src/
├── server/
│   ├── models/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
└── README.md
