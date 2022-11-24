import { BASE_URL_SOCKET } from "../../ultils/socketApi";

const websocket = new WebSocket(BASE_URL_SOCKET)

let connection_resolvers = [];
let checkConnection = () => {
  return new Promise((resolve, reject) => {
    if (websocket.readyState === WebSocket.OPEN) {
      resolve();
    }
    else {
      connection_resolvers.push({ resolve, reject });
    }
  });
}

websocket.addEventListener('open', () => {
  connection_resolvers.forEach(r => r.resolve())
});

let ws = websocket;
checkConnection().then(() => {
    ws = websocket;
});

export default ws;