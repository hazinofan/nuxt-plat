export default defineNuxtPlugin(() => {
    let socket;
    let isRestored = false;
  
    const connectWebSocket = () => {
      if (isRestored) return;
      socket = new WebSocket("wss://your-websocket-url");
  
      socket.onopen = () => console.log("WebSocket Connected");
      socket.onmessage = (event) => console.log("Message:", event.data);
      socket.onclose = () => console.log("WebSocket Disconnected");
    };
  
    const closeWebSocket = () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  
    if (process.client) {
      window.addEventListener("pagehide", closeWebSocket);
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          isRestored = true;
          connectWebSocket();
        }
      });
  
      connectWebSocket();
    }
  });
  