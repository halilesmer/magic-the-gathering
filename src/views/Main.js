import { Route, Routes } from "react-router-dom";

import Cards from "./Cards";
import Chat from "./Chat";
import Details from "./Details";
import ErrorPage from "../component/ErrorPage";
import Home from "./Home";
import LoginPage from "./LoginPage";
import MyCardsPage from "./MyCardsPage";
import { MyCardsProvider } from "../context/myCardsContext";
import ProfilePage from "../component/ProfilePage";
import ProtectedRoute from "../component/ProtectedRoute";
import React from "react";
import RegisterPage from "../component/RegisterPage";

// import Grid from "@mui/material/Grid";

const Main = () => {
  return (
    <main id="mainCon" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <MyCardsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="cards/:pagination"
            element={
              <ProtectedRoute>
                <Cards />
              </ProtectedRoute>
            }
          />
          <Route path="cards/details/:title/" element={<Details />} />
          <Route path="mycards/" element={<MyCardsPage />} />

          <Route
            path="chat/"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="registerpage/" element={<RegisterPage />} />
          <Route path="login/" element={<LoginPage />} />
          <Route path="profile/" element={<ProfilePage />} />
          <Route
            path="*"
            element={<ErrorPage errorMsg="Something went wrong ..." />}
          />
        </Routes>
      </MyCardsProvider>
    </main>
  );
};

export default Main;
