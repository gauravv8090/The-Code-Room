import React from "react";
import { useState } from "react";
import logo from "../Assets/Code2.png";
import Clients from "../components/Clients";
import Editor from "../components/Editor";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, userName: "Gaurav A" },
    { socketId: 2, userName: "Rakesh K" },
    { socketId: 3, userName: "Mukesh K" },
  ]);

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

        <button className="btn copyBtn" >
          Copy ROOM ID
        </button>
        <button  className="btn leaveBtn" >
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <Editor/>
      </div>
    </div>
  );
};

export default EditorPage;
