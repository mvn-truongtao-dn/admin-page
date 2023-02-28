import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import Participant from "./Participant";

type RoomProps = {
  roomName: any;
  token: any;
  handleLogout: any;
};

const Room = ({ roomName, token, handleLogout }: RoomProps) => {
  const [room, setRoom] = useState<any>(null);
  const [participants, setParticipants] = useState<any>([]);

  useEffect(() => {
    const participantConnected = (participant: any) => {
      setParticipants((prevParticipants: any) => [
        ...prevParticipants,
        participant,
      ]);
    };

    const participantDisconnected = (participant: any) => {
      setParticipants((prevParticipants: any) =>
        prevParticipants.filter((p: any) => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then((room: any) => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom: any) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication: any
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant: any) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
