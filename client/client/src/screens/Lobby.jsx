import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import '../styles/meet.css';

const LobbyScreen = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (socket) {
        socket.emit("room:join", { name, room });
      } else {
        console.error("Socket object is null.");
      }
    },
    [name, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { name, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (socket) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    } else {
      console.error("Socket object is null.");
    }
  }, [socket, handleJoinRoom]);

  console.log("Socket object:", socket);

  return (
    <div className="login-box">
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="user-box">
          <label htmlFor="name"></label>
          <input
          placeholder="Name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="user-box">
          <label htmlFor="room"></label>
          <input
          placeholder="Room"
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button className="join-meet">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
