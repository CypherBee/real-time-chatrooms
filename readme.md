# Real-time room chat application
This application allows users to create rooms and send messages to each other in real-time. Users can create and join rooms and live chat in their selected room.

## Live app
https://real-time-chatrooms.onrender.com/login

## Tech stack
-   Mongo, Express, React, Socket.io.


## Features
-   Real-time messaging
-   User authentication
-   Room creation and management
-   Analytics

## Getting Started

### Env file Setup
FrontEnd Env File located in /frontEnd:
``` 
VITE_SOCKET_URL=http://localhost:5000
```

Backend Env file located in /:

``` 
PORT= // 5000
MONGO_DB_URI= // mongodb+srv:...
JWT_SECRET=// You can use this command on bash ```openssl rand -base64 32```
NODE_ENV=
```

### Installation

1. Clone the repository

```sh
git clone https://github.com/CypherBee/real-time-chatrooms
```

2. Run the build script to install dependencies and build the app.

```sh
npm run build
```

3. Run the app

```sh
npm run start
```
