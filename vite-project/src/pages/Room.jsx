import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../services/peer";
import { useSocket } from "../context/SocketProvider";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const Title = styled.h2`
  margin: 0px;
  padding: 0px;
`;

const Status = styled.h4`
  color: #2ecc71;
`;

const ButtonCont = styled.div`
  display: flex;
  align-item = center;
`;
const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 5px;
  margin: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const StreamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-right: 20px;
`;

const Stream = styled.div`
  align-item = center;
  margin: 5px;
`;

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [showConnectedMessage, setShowConnectedMessage] = useState(false);

  const handleUserJoined = useCallback(({email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
    setShowConnectedMessage(true);
    setTimeout(() => {
      setShowConnectedMessage(false);
    }, 2000);
  }, []);

  const handleCallUser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
      setMyStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      // console.log("GOT TRACKS!!",remoteStream[0]);
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <Container>
      <Title>Room Page</Title>
      <Status>
      {remoteSocketId
          ? (showConnectedMessage && "Connected")
          : "No one in the room"}
      </Status>
      <StreamContainer>
        {myStream && (
          <Stream>
            <h2>My Video</h2>
            <ReactPlayer
              playing
              muted={isMuted}
              width="300px"
              height="300px"
              url={myStream}
            />
          </Stream>
        )}
        {remoteStream && (
          <Stream>
            <h2>Other Video</h2>
            <ReactPlayer
              playing
              height="300px"
              width="300px"
              url={remoteStream}
            />
          </Stream>
        )}
      </StreamContainer>
      <ButtonCont>
        {myStream && (
          <>
            <Button onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? "Unmute" : "Mute"}
            </Button>
          </>
        )}
        {myStream && <Button onClick={sendStreams}>Send Stream</Button>}
        {remoteSocketId && <Button onClick={handleCallUser}>CALL</Button>}
      </ButtonCont>
    </Container>
  );
};

export default Room;
