import React, { useState, useCallback } from "react";
import Lobby from "../../components/video-call/Lobby";
import Room from "../../components/video-call/Room";

export default function VideoChat() {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((event: any) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event: any) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      const data = await fetch(
        "https://example-service-nodejs.onrender.com/join-room",
        {
          method: "POST",
          body: JSON.stringify({
            roomName: roomName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      setToken(data.token);
    },
    [roomName]
  );

  const handleLogout = useCallback((event: any) => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
}
