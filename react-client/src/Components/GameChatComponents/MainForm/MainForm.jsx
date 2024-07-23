import React, { useEffect, useState } from "react";
import GameChatApiWorker from "../Api/Api";
import GamesItemList from "../GamesItemList/GamesItemList";
import CategoryItem from "../CategoryItem/CategoryItem";

const MainForm = () => {
  let [games, setGames] = useState([]);
  let [genres, setGenres] = useState([]);
  let [platforms, setPlatfroms] = useState([]);
  let [page, setPage] = useState(1);
  let [genre, setGenre] = useState("null");
  let [platform, setPlatform] = useState("null");
  let [rating, setRating] = useState("null");
  let [searchField, setSearchField] = useState("");
  let [currentGames, setCurrentGames] = useState("");
  let [isLastPage, setIsLastPage] = useState(false);

  let gamesApiWorker = new GameChatApiWorker();

  const loadPage = () => {
    gamesApiWorker
      .getGenres()
      .then((response) => {
        console.log(response.data);
        setGenres(response.data);
      })
      .catch((error) => console.log("GET Error"));

    gamesApiWorker
      .getPlatforms()
      .then((response) => setPlatfroms(response.data))
      .catch((error) => console.log("GET Error"));

    gamesApiWorker
      .getAllGames(1)
      .then((response) => setGames(response.data))
      .catch((error) => console.log("GET Error"));

      document.getElementById("genresBox").value = "";
      document.getElementById("platformsBox").value = "";
      document.getElementById("ratingBox").value = "";  
  };

  useEffect(() => {
    loadPage();
     document.getElementById("genresBox").value = "";
    document.getElementById("platformsBox").value = "";
    document.getElementById("ratingBox").value = "";

  }, []);

  useEffect(() => {
    if (searchField == "") {
      setPage(1);
      loadPage();
      setIsLastPage(false);
      setCurrentGames("");
    }
  }, [searchField]);

  const filter = () => {
    if(genre !== "null" || platform !== "null" || rating !== "null"){
    console.log(genre, platform, rating);
    setCurrentGames("combobox");
    setIsLastPage(false);
    setPage(1);
    gamesApiWorker
      .getFilteredGames(page, genre, platform, rating)
      .then((response) => setGames(response.data))
      .catch((error) => console.log("GET Error"));

    gamesApiWorker
      .getFilteredGames(page + 1, genre, platform, rating)
      .then((response) => {
        if (response.data.length == 0) {
          setIsLastPage(true);
        }
      })
      .catch((error) => console.log("GET Error"));}
      else{
        alert("Фильтр пуст!");
      }
  };

  const filterByGenre = () => {
    setGenre(document.getElementById("genresBox").value);
  };

  const filterByPlatform = () => {
    setPlatform(document.getElementById("platformsBox").value);
  };

  const filterByRating = () => {
    setRating(document.getElementById("ratingBox").value);
  };

  const clearFilter = () => {
    setIsLastPage(false);
    setGenre("null");
    setPlatform("null");
    setRating("null");
    setPage(1);
    setCurrentGames("");

    document.getElementById("genresBox").value = "";
    document.getElementById("platformsBox").value = "";
    document.getElementById("ratingBox").value = "";

    gamesApiWorker
      .getAllGames(1)
      .then((response) => setGames(response.data))
      .catch((error) => console.log("GET Error"));
    alert("Фильтр очищен");
  };
  const nextPage = () => {
    page += 1;
    setPage(page);

    if (currentGames == "combobox") {
      gamesApiWorker
        .getFilteredGames(page, genre, platform, rating)
        .then((response) => setGames(response.data))
        .catch((error) => console.log("GET Error"));

      gamesApiWorker
        .getFilteredGames(page + 1, genre, platform, rating)
        .then((response) => {
          if (response.data.length == 0) setIsLastPage(true);
        })
        .catch((error) => console.log("GET Error"));
      console.log(isLastPage);
    }
    if (currentGames == "search") {
      let game = {
        id: 0,
        title: searchField,
        avgRating: "",
        picture: "",
        date: "",
        themes: [],
      };

      gamesApiWorker
        .getGamesBySearch(page, game)
        .then((response) => setGames(response.data))
        .catch((error) => console.log("PUT Error"));

      gamesApiWorker
        .getGamesBySearch(page + 1, game)
        .then((response) => {
          if (response.data.length == 0) setIsLastPage(true);
        })
        .catch((error) => console.log("PUT Error"));
    }
    if (currentGames == "") {
      gamesApiWorker
        .getAllGames(page)
        .then((response) => setGames(response.data))
        .catch((error) => console.log("GET Error"));

      gamesApiWorker
        .getAllGames(page + 1)
        .then((response) => {
          if (response.data.length == 0) setIsLastPage(true);
        })
        .catch((error) => console.log("GET Error"));
    }
  };

  const lastPage = () => {
    setIsLastPage(false);

    if (page != 1) {
      page -= 1;
      setPage(page);
      if (currentGames == "combobox") {
        console.log(1);
        gamesApiWorker
          .getFilteredGames(page, genre, platform, rating)
          .then((response) => setGames(response.data))
          .catch((error) => console.log("GET Error"));
      }
      if (currentGames == "search") {
        let game = {
          id: 0,
          title: searchField,
          avgRating: "",
          picture: "",
          date: "",
          themes: [],
        };

        gamesApiWorker
          .getGamesBySearch(page, game)
          .then((response) => setGames(response.data))
          .catch((error) => console.log("PUT Error"));
      }
      if (currentGames == "") {
        gamesApiWorker
          .getAllGames(page)
          .then((response) => setGames(response.data))
          .catch((error) => console.log("GET Error"));
      }
    }
  };

  const searchGames = () => {
    setPage(1);
    console.log(searchField);
    setCurrentGames("search");
    let game = {
      id: 0,
      title: searchField,
      avgRating: "",
      picture: "",
      date: "",
      themes: [],
    };

    if (searchField.length > 3) {
      gamesApiWorker
        .getGamesBySearch(page, game)
        .then((response) => setGames(response.data))
        .catch((error) => console.log("PUT Error"));

      gamesApiWorker
        .getGamesBySearch(page + 1, game)
        .then((response) => {
          if (response.data.length == 0) setIsLastPage(true);
        })
        .catch((error) => console.log("PUT Error"));
    } else {
      alert("Не менее 3 символов!");
    }
  };

  return (
    <div>
      <section class="jumbotron text-center">
        <div class="container">
          <div class="row my-2 justify-content-center">
            <div class="col-sm-5 input-group">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Название игры"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <button
                onClick={searchGames}
                type="button"
                class="btn btn-outline-secondary"
              >
                Найти
              </button>
            </div>
            <div class="my-3 col-sm-2">
              <p>Жанры</p>
              <select
                id="genresBox"
                onChange={filterByGenre}
                class=" form-select col-lg-1 text-center"
              >
                {genres?.map((category) => {
                  return <CategoryItem category={category} key={category.id} />;
                })}
              </select>
            </div>

            <div class="my-3 col-sm-2">
              <p>Платформы</p>
              <select
                id="platformsBox"
                onChange={filterByPlatform}
                class=" form-select col-lg-1 text-center"
              >
                {platforms?.map((category) => {
                  return <CategoryItem category={category} key={category.id} />;
                })}
              </select>
            </div>
            <div class="my-3 col-sm-2">
              <p>По рейтингу</p>
              <select
                id="ratingBox"
                onChange={filterByRating}
                class="form-select col-lg-1 text-center"
              >
                <option>Низкий</option>
                <option>Высокий</option>
              </select>
            </div>
          </div>

          <div class="btn-group">
            <button
              onClick={filter}
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              Применить фильтры
            </button>
            <button
              onClick={clearFilter}
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              Очистить фильтры
            </button>
          </div>
        </div>
      </section>{" "}
      <GamesItemList games={games} />
      {games.length != 0 ? (
        <nav
          class="w-100 justify-content-center text-dark  navbar navbar-expand-lg "
          aria-label="Page navigation example"
        >
          <ul class="pagination">
            {page == 1 ? (
              <div></div>
            ) : (
              <li class="page-item">
                <a onClick={lastPage} class="text-dark page-link" href="#">
                  Назад
                </a>
              </li>
            )}
            {page == 1 && isLastPage == true ? (
              <div></div>
            ) : (
              <li class="page-item">
                <a class="text-dark page-link" href="#">
                  {page}
                </a>
              </li>
            )}
            {isLastPage != true ? (
              <li class="page-item">
                <a onClick={nextPage} class=" text-dark page-link" href="#">
                  Далее
                </a>
              </li>
            ) : (
              <div></div>
            )}
          </ul>
        </nav>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MainForm;
