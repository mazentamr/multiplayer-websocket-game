const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Array to store player and chat information
let players = [];
let chatMessages = []; 
let multipliers = [];

// Function to generate unique IDs
const generatePlayerId = () => Math.floor(Math.random() * 10000);
const generateMultipliersId = () => Math.floor(Math.random() * 10000);

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New player connected.');

    // Send existing players to the new client
    ws.send(JSON.stringify({ message: 'Welcome to the game!', players }));

    // Handle incoming messages
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'new_player':
                handleNewPlayer(data);
                break;

            case 'multipliers':
                handleMultipliers(data);
                break;

            case 'chat':
                handleChat(data);
                break;

            default:
                console.log('Unknown message type:', data.type);
                break;
        }
    });

    // Handle player disconnection
    ws.on('close', () => {
        console.log('Player disconnected.');
    });
});

// Handle new player addition
const handleNewPlayer = (data) => {
    const newPlayer = {
        id: generatePlayerId(),
        name: data.name,
        basePoints: 1000,
        points: data.points,
        multiplier: data.multiplier
    };

    players.push(newPlayer);
    console.log('Players:', players);

    // Notify all clients about the new player
    broadcast({ type: 'player_added', player: newPlayer, players, chatMessages });
};

// Handle multiplier updates
const handleMultipliers = (data) => {
    const multiplier = {
        id: generateMultipliersId(),
        playerId: data.playerId,
        multiplier: data.multiplier
    };

    let player = players.find(obj => obj.id === data.playerId);
    if (player) {
        player.basePoints += (player.points * data.multiplier);
        player.points = player.points * data.multiplier;
    }

    multipliers.push(multiplier);
    console.log('Multipliers:', multipliers);
    console.log('Players:', players);

    // Notify all clients about the multipliers update
    broadcast({ type: 'multipliers', multipliers, players });
};

// Handle chat messages
const handleChat = (data) => {
    const newMessage = {
        playerId: data.playerId,
        playerName: data.playerName,
        message: data.message,
    };

    chatMessages.push(newMessage);
    console.log('Chat messages:', chatMessages);

    // Broadcast the chat message to all clients
    broadcast({ type: 'chat', chatMessages });
};

// Function to broadcast messages to all connected clients
const broadcast = (data) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};
