import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import styled from 'styled-components';
import icon from '../assets/meet.jpg';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin-top: 7rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 50%;

  img {
    width: 80%;
    height: 100%;
  }
`;

const FormContainer = styled.div`
  width: 50%;

  form {
    // margin-left: 2rem;
    text-align: left;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      box-sizing: border-box;
    }

    button {
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  }
`;
const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <Container>
        <ImageContainer>
          <img src={icon} alt="Image description" />
        </ImageContainer>
        <FormContainer>
          <form onSubmit={handleSubmitForm}>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="room">Room Number</label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <br />
            <button>Join</button>
          </form>
        </FormContainer>
      </Container>
    </div>
  );
};

export default Lobby;