import React, { useState, useEffect, useRef } from "react";

type ParticipantProps = {
  participant: any;
};

const Participant = ({ participant }: ParticipantProps) => {
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const [audioTracks, setAudioTracks] = useState<any>([]);

  const videoRef = useRef<any>(null);
  const audioRef = useRef(null);

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks: any) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) =>
          videoTracks.filter((v: any) => v !== track)
        );
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks: any) =>
          audioTracks.filter((a: any) => a !== track)
        );
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
    </div>
  );
};

export default Participant;
