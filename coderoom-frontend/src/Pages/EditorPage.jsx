import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ACTIONS from "../Actions";
import logo from "../Assets/Code2.png";
import Clients from "../components/Clients";
import Editor from "../components/Editor";
import { initSocket } from "../socket";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigate  = useNavigate();
  const {roomID} = useParams();
  const codeRef = useRef(null);


  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on('connect_error', (err)=>handelErrors(err));
      socketRef.current.on('connect_failed', (err)=>handelErrors(err));

      const handelErrors = (err)=>{
        console.log('socket error', err);
        toast.error('Socket connection failed, try again later.');
        reactNavigate('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomID,
        userName: location.state?.userName,
      });

      //Listen for joined event
      socketRef.current.on(ACTIONS.JOINED, ({clients, userName, socketId})=>{
        if(userName !== location.state?.userName ){
          toast.success(`${userName} joined the room.`)
          console.log(`${userName} joiined .`)
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      })

      // Listen for disconnected

      socketRef.current.on(ACTIONS.DISCONNECT, ( {socketId, userName} )=>{

        toast.success(`${userName} left the room.`);
        setClients((prev)=>{
          return prev.filter((client)=> client.socketId !== socketId );
        })
      })

    };
    init();

    return ()=>{
      socketRef.current.off(ACTIONS.DISCONNECT);
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.disconnect(); 
    }
  }, []);


  const copyRoomId = async ()=>{
    try{
      console.log(roomID);
      await navigator.clipboard.writeText(roomID);
      toast.success('Room ID has been copied');
    }
    catch (err) {
      toast.error('Could not copy the Room ID');
      console.log(err);
    }
  }

  const leaveRoom = ()=>{
    reactNavigate('/');
  }
  

  if(!location.state){
    return <Navigate to='/'/>
  }

  return (
    <div className="MainWrapper">
      <div className="left">
        <div className="leftInner">
          <div className="logo">
            <img className="logoImage" src={logo} alt="logo" />
          </div>

          <h3>Connected</h3>
          <div className="clientList">
            {clients.map((client) => (
              <Clients key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>

        <button className="btn copyBtn" onClick={copyRoomId} >Copy ROOM ID</button>
        <button className="btn leaveBtn" onClick={leaveRoom} >Leave</button>
      </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomID={roomID} onCodeChange={(code)=>{
          codeRef.current = code;
        }} />
      </div>
    </div>
  );
};

export default EditorPage;
