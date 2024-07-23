import { compose } from "@reduxjs/toolkit";
import GameChatApiWorker from "../GameChatComponents/Api/Api";

const UserTheme = ({ theme }) => {
  let themeApiWorker = new GameChatApiWorker();

  const goToTheme = () => {
    themeApiWorker
      .getGameById(theme)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("Game", JSON.stringify(response.data));
        localStorage.setItem("ThemePage", JSON.stringify(1));
        window.location.href = "/themeForm";
      })
      .catch();
  };

  return (
    <form>
      <div class=" my-3 form-outline">
        <p id={"textarea" + theme.id} class="form-control" rows="4">
          {theme.title}
        </p>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <button onClick={goToTheme} type="button" class="btn btn-dark">
          Перейти к обсуждению
        </button>
      </div>
    </form>
  );
};

export default UserTheme;
