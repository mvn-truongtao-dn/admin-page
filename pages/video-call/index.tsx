import React, { useState } from "react";
import { Twilio } from "twilio";
// import { connect, Video } from "twilio-video";
// import Video from "twilio-video";

type Props = {};

export default function VideoCall2({}: Props) {
  const [inputValue, setInputValue] = useState("");

  // const joinVideoRoom = async (roomName: any, token: any) => {
  //   const room = await Video.connect(token, {
  //     room: roomName,
  //   });
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const roomName = inputValue;

    const response = await fetch("http://localhost:3000/join-room", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName: roomName }),
    });

    const { token } = await response.json();
    console.log(token);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}
