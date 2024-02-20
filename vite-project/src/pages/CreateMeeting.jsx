import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import styled from "styled-components";
import icon from "../assets/meet.jpg";

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
    a {
      display: block;
      margin: 10px 20px;
      padding: 8px 10px;
      width : 35%;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
  
      &:hover {
        background-color: #0056b3;
      }
    }
    button {
      display: block;
      margin: 10px 20px;
      padding: 8px 10px;
      width : 35%;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
  
      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const CreateMeeting = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Initialize with the context value
  const [room, setRoom] = useState("");

  const [isCreateMeeting, setIsCreateMeeting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { name, email, room });
    },
    [name, email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  const handleCreateMeeting = useCallback(() => {
    if (!name && !email) {
      setErrorMessage("Name and Email are required.");
      return;
    }
    if (!name) {
      setErrorMessage("Name are required.");
      return;
    }
    if (!email) {
      setErrorMessage("Email are required.");
      return;
    }

    setIsCreateMeeting(true);
    setErrorMessage("");

    const generatedRoomNumber = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    setRoom(generatedRoomNumber);
  }, [name, email]);

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
          <h2> Create Meeting</h2>
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
            {!isCreateMeeting ? (
              <>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Link onClick={handleCreateMeeting}>Create Room No</Link>
              </>
            ) : (
              <>
                <p>Your room number: {room}</p>
                <button type="submit">Submit</button>
              </>
            )}
          </form>
        </FormContainer>
      </Container>
    </div>
  );
};

export default CreateMeeting;
