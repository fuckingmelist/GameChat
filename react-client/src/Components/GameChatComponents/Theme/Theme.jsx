import React from "react";
import GameChatApiWorker from "../Api/Api";

const Theme = ({ theme }) => {
  let user = JSON.parse(localStorage.getItem("User"));

  const GoToComments = () => {
    localStorage.removeItem("Theme");
    localStorage.setItem("Theme", JSON.stringify(theme));
    localStorage.setItem("CommentPage", JSON.stringify(1));
    window.location.href = "/commentForm";
  };

  const deleteTheme = () => {
    let themeApiWorker = new GameChatApiWorker();
    themeApiWorker.deleteTheme(theme.id).then((response) => {
      window.location.href="/themeForm";
    }).catch((error)=>console.log("DELETE Error"));
  };

  if (user !== null && user.id === theme.userId) {
    return (
      <div class="btn card mb-4 my-2 align-items-center">
        <div onClick={GoToComments}>
          <h5 class="">{theme.title}</h5>
        </div>
        <button onClick={deleteTheme} class="col-lg-4 btn btn-danger">
          Удалить
        </button>
      </div>
    );
  } else {
    return (
      <div onClick={GoToComments} class="btn card mb-4 my-2 align-items-center">
        <h5 class="">{theme.title}</h5>
      </div>
    );
  }
};

export default Theme;
