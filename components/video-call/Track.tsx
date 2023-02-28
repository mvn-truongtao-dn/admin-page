import React, { useEffect, useRef } from "react";

type TrackProps = {
  track: any;
};

export default function Track({ track }: TrackProps) {
  const blockRef = useRef<any>(null);

  useEffect(() => {
    if (track !== null) {
      const child = track.attach();
      blockRef.current.classList.add(track.kind);
      blockRef.current.appendChild(child);
    }
  }, []);

  return (
    <div className="track" ref={blockRef}>
      Track
    </div>
  );
}
