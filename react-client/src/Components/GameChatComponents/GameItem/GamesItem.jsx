import React from "react";
import GenreItemList from "../GenreItemList/GenreItemList";
import PlatformItemList from "../PlatformItemList/PlatformItemList";

const GamesItem = ({ gamepack }) => {
  let imgSrc = "data:image/png;base64," + gamepack.game.picture;

  const GoToThemes = () => {
    localStorage.removeItem("Game");
    localStorage.setItem("Game", JSON.stringify(gamepack.game));
    localStorage.setItem("ThemePage", JSON.stringify(1));
    window.location.href = "/themeForm";
  };

  return (
    <div class="col-md-4">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img width={140} height={194} src={imgSrc} class=" rounded-3"></img>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{gamepack.game.title}</h5>
              <small class="text-muted">{gamepack.game.date}</small>
              <GenreItemList genres={gamepack.genres} />
              <PlatformItemList platforms={gamepack.platforms} />
            </div>
          </div>
          <div class="p-3 row-md-4 d-flex justify-content-between align-items-center">
            <button
              onClick={GoToThemes}
              type="button"
              class="btn btn-sm btn-outline-dark"
            >
              Форум
            </button>
            <h4 class="text-muted">
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>{" "}
              {gamepack.game.avgRating}{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesItem;
