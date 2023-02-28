import React from "react";

type LobbyProps = {
  username: any;
  handleUsernameChange: any;
  roomName: any;
  handleRoomNameChange: any;
  handleSubmit: any;
};

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
}: LobbyProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
