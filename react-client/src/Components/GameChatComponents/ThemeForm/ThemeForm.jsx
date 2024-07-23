import { useEffect, useState } from "react";
import GameChatApiWorker from "../Api/Api";
import ThemeList from "../ThemeList/ThemeList";

const ThemeForm = () => {
  let [themes, setThemes] = useState([]);
  let [page, setPage] = useState(JSON.parse(localStorage.getItem("ThemePage")));
  let [isLastPage, setIsLastPage] = useState(false);
  let themesApiWorker = new GameChatApiWorker();
  let game = JSON.parse(localStorage.getItem("Game"));
  let user = JSON.parse(localStorage.getItem("User"));

  if (user == null) {
    user = {
      id: 0,
      nickname: "",
      login: "",
      password: "",
      eMail: "",
      profilePicture: null,
      comments: [],
      themes: [],
    };
  }

  console.log(user);

  const getThemes = (gameId, page, userId) => {
    themesApiWorker
      .getThemes(gameId, page, userId)
      .then((response) => {
        setThemes(response.data);
        themesApiWorker
          .getThemes(gameId, page + 1, userId)
          .then((response) => {
            if (response.data.length == 0) {
              setIsLastPage(true);
            }
          })
          .catch((error) => console.log("GET Error"));
      })
      .catch((error) => console.log("GET Error"));
  };

  useEffect(() => {
    getThemes(game.id, page, user.id);
  }, []);

  const addTheme = () => {
    if (user.id != 0) {
      let theme = {
        id: 0,
        title: document.getElementById("Title").value,
        userId: user.id,
        gameId: game.id,
        userNickname: "",
      };

      if (theme.title != "" && theme.title.length < 51) {
        themesApiWorker
          .addTheme(theme)
          .then((response) => {
            if (response.data === "") {
              getThemes(game.id, page, user.id);
            } else {
              alert(response.data);
            }
          })
          .catch((error) => console.log("POST Error"));
      } else alert("Обсуждение не может быть пустым, а также не больше 50 символов.");
    } else {
      window.location.href = "/signInForm";
    }
  };

  const nextPage = () => {
    page += 1;
    setPage(page);

    localStorage.setItem("ThemePage", JSON.stringify(page));

    getThemes(game.id, page, user.id);
  };

  const lastPage = () => {
    if (page != 1) {
      page -= 1;
      setPage(page);
      setIsLastPage(false);
      localStorage.setItem("ThemePage", JSON.stringify(page));
      getThemes(game.id, page, user.id);
    }
  };

  return (
    <div>
      <div class="row d-flex justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-0 border">
            <div class="card-body p-4">
              <div class="row d-flex justify-content-center form-outline mb-4">
                <h1 class="text-center">{"Обсуждения " + game.title}</h1>
                <div class="row d-flex justify-content-center form-outline mb-4 my-5">
                  <input
                    id="Title"
                    type="text"
                    class="text-center my-3 form-control"
                    placeholder="Новое обсуждение"
                    onClick={() => {
                      if (user.id == 0) {
                        window.location.href = "/signInForm";
                      }
                    }}
                  />
                  <button
                    onClick={addTheme}
                    class="col-lg-5 btn btn-outline-dark"
                  >
                    Добавить
                  </button>
                </div>
              </div>
              <ThemeList themes={themes} />
              <nav
                class="w-100 justify-content-center text-dark  navbar navbar-expand-lg navbar-light bg-light"
                aria-label="Page navigation example"
              >
                <ul class=" pagination">
                  {page != 1 ? (
                    <li class="page-item">
                      <a
                        onClick={lastPage}
                        class="text-dark page-link"
                        href="#"
                      >
                        Назад
                      </a>
                    </li>
                  ) : (
                    <div></div>
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
                  {isLastPage == false ? (
                    <li class="page-item">
                      <a
                        onClick={nextPage}
                        class=" text-dark page-link"
                        href="#"
                      >
                        Далее
                      </a>
                    </li>
                  ) : (
                    <div></div>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeForm;
