import { useEffect, useState } from "react";

import { ConnectionManager } from "./components/ConnectionManager";
import { ConnectionState } from "./components/ConnectionState";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";

import { socket } from "./socket";

export default function App() {
  console.log({ socket });
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    socket.on("message", (message) =>
      setMessages((prev) => [...prev, message])
    );

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm messages={messages} />
    </div>
  );
}
