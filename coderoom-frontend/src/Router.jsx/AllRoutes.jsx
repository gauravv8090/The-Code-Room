import React from "react";
import { Route, Routes } from "react-router-dom";
import EditorPage from "../Pages/EditorPage";
import Home from "../Pages/Home";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/editor/:roomID" element={<EditorPage />}></Route>
    </Routes>
  );
};

export default AllRoutes;
