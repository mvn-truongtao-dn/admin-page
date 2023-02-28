import Room from "@/components/video-call/Room";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "twilio-video";
type Props = {};

export default function VideoCall({}: Props) {
  const [identity, setIdentity] = useState("");
  const [room, setRoom] = useState<any>(null);
  const inputRef = useRef<any>("");
  const joinRoom = async () => {
    try {
      const response = await fetch(
        `https://example-service-nodejs.onrender.com/token?identity=${identity}`
      );
      const data = await response.json();
      console.log(data);

      const room = await connect(data.token, {
        name: "cool-room",
        audio: true,
        video: true,
      });
      console.log(room);

      setRoom(room);
    } catch (err) {
      console.log(err);
    }
  };

  const returnToLobby = () => {
    setRoom(null);
  };

  const removePlaceholderText = () => {
    inputRef.current.placeholder = "";
  };

  const updateIdentity = (event: any) => {
    setIdentity(event.target.value);
  };

  const disabled: boolean = identity === "" ? true : false;
  return (
    <div className="app">
      {room === null ? (
        <div className="lobby">
          <input
            placeholder="What's your name?"
            onClick={removePlaceholderText}
            onChange={updateIdentity}
            value={identity}
            ref={inputRef}
          />
          <button onClick={joinRoom} disabled={disabled}>
            Join Room
          </button>
        </div>
      ) : (
        // <Room returnToLobby={returnToLobby} room={room} />
        <></>
      )}
    </div>
  );
}
