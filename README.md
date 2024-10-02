# Multiplayer Game with Real-Time Chat Using WebSockets

This project implements a **real-time multiplayer game** where players can connect to a WebSocket server, send and receive chat messages, and view other players' game stats. Each player is assigned random points and a multiplier, and the system uses WebSockets to update all connected clients dynamically.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [WebSocket Server Overview](#websocket-server-overview)
- [Client-Side Overview](#client-side-overview)

## Features

- **Real-Time Player Updates**: Automatically assign a unique ID, points, and a multiplier to each player upon connection.
- **WebSocket Communication**: Players can communicate via chat in real time.
- **Dynamic Game State**: The game state (players, points, and multipliers) is shared and updated across all connected clients.
- **Player Disconnection Handling**: Players are removed from the game upon disconnection.
- **Frontend Rendering**: The frontend dynamically displays all active players and chat messages.

## Technologies Used

- **Backend**: Node.js with WebSocket for real-time communication.
- **Frontend**: React and Next.js for rendering game and chat UI.
- **Communication Protocol**: WebSocket for real-time messaging.
- **CSS Framework**: Tailwind CSS for responsive and modern UI design.

## Project Setup

### Prerequisites

- **Node.js** (v14 or above)
- **npm** or **yarn**

### Steps to Run the Project Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repo/multiplayer-websocket-game.git
   cd multiplayer-websocket-game

2. **Install Dependencies for both the server and the client:**:
# Install server dependencies
    cd server
    npm install

# Install client dependencies
    cd ../client
    npm install

3. **Run the WebSocket Server:**:
    cd server
    node server.js
    

4. **Run the Frontend:**:
    npm i
    npm run dev

