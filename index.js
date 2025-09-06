const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let uiClients = [];

wss.on('connection', (ws, req) => {
  if (req.url === '/ui') {
    uiClients.push(ws);
    ws.send(JSON.stringify({ speaker: 'remote', text: 'こんにちは！' }));
    const interval = setInterval(() => {
      ws.send(JSON.stringify({ speaker: 'remote', text: '元気ですか？' }));
    }, 5000);
    ws.on('close', () => {
      clearInterval(interval);
      uiClients = uiClients.filter(c => c !== ws);
    });
  }
});

app.post('/voice', (req, res) => {
  console.log('Simulated call started');
  res.status(200).json({ status: 'call started (simulated)' });
});

app.post('/speak', (req, res) => {
  const { text } = req.body;
  uiClients.forEach(ws => {
    ws.send(JSON.stringify({ speaker: 'local', text }));
  });
  res.status(200).json({ status: 'text sent to UI' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
