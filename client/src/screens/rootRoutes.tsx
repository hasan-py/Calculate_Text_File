import axios from "axios";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScreenA from "./A";
import ScreenB from "./B";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export enum RouterPathEnum {
  SCREENA = "/",
  SCREENB = "/screenb",
}
axios.defaults.baseURL = "http://localhost:8000/";

function RootRoutes() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/screenb" element={<ScreenB />} />
          <Route path="/" element={<ScreenA />} />

          <Route path="*" element={<>404 not found</>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default RootRoutes;
