import React, { useState } from "react";
import logo from "../Assets/Code2.png";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomID, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomID || !userName) {
      toast.error("ROOM ID & userName is required");
      return;
    }
    navigate(`/editor/${roomID}`, {
      state: {
        userName,
      },
    });
  };

  const handelKeyEnter = (e)=>{
    if(e.code === 'Enter'){
        joinRoom();
    }
  }


  return (
    <div className="homepage">
      <div className="formHome">
        <img src={logo} className="homeLogo" alt="logo" />
        <h4 className="lable">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            onKeyUp={handelKeyEnter}
            className="inputBox"
            value={roomID}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="ROOM ID"
            name=""
            id=""
          />
          <input
            type="text"
            onKeyUp={handelKeyEnter}
            className="inputBox"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            name=""
            id=""
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            {" "}
            If you don't have an invite then create &nbsp;
            <a href="/" onClick={createNewRoom} className="createNewBtn">
              new room
            </a>{" "}
          </span>
        </div>
      </div>

      <footer>
        <h4>
          Built with &#x1F49B; by&nbsp;{" "}
          <a href="https://github.com/gauravv8090">Gaurav Agarwal</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
