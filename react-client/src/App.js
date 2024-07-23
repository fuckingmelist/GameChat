import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./Components/GameChatComponents/SignUpForm/SignUpForm";
import SignInForm from "./Components/GameChatComponents/SignInForm/SignInForm";
import Loyout from "./Components/Loyout/Loyout";
import NotFound from "./Components/NotFound/NotFound";
import MainForm from "./Components/GameChatComponents/MainForm/MainForm";
import ThemeForm from "./Components/GameChatComponents/ThemeForm/ThemeForm";
import CommentForm from "./Components/GameChatComponents/CommentsForm/CommentsForm";
import ProfileForm from "./Components/GameChatComponents/ProfileForm/ProfileForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Loyout />}>
          <Route index element={<MainForm />} />
          <Route path="/themeForm" element={<ThemeForm />} />
          <Route path="/commentForm" element={<CommentForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/signUpForm" element={<SignUpForm />} />
        <Route path="/signInForm" element={<SignInForm />} />
        <Route path="/profileForm" element={<ProfileForm />} />
      </Routes>
    </div>
  );
};

export default App;
