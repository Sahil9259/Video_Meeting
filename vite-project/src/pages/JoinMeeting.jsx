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
      margin-right: 10px;
    }
  }
`;

const JoinMeeting = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
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
            <h2>Join Meeting</h2>
          <form onSubmit={handleSubmitForm}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label htmlFor="room">Room Number</label>
            <input
                type="text"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </FormContainer>
      </Container>
    </div>
  );
};

export default JoinMeeting;
