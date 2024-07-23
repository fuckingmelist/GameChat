import { useEffect, useState } from "react";
import GameChatApiWorker from "../Api/Api";
import UserComment from "../../ProfileComponents/UserComment";
import UserTheme from "../../ProfileComponents/UserTheme";

const ProfileForm = () => {
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  let [themes, setThemes] = useState([]);
  let [comments, setComments] = useState([]);
  let [nickname, setNickname] = useState("");
  let [login, setLogin] = useState("");
  let [password, setPassword] = useState("");
  let [eMail, setEMail] = useState("");
  let [dataURL, setDataURL] = useState("");
  let [themePage, setThemePage] = useState(1);
  let [commentPage, setCommentPage] = useState(1);
  let [isThemeLastPage, setIsThemeLastPage] = useState(false);
  let [isCommentLastPage, setIsCommentLastPage] = useState(false);

  let profileApiWorker = new GameChatApiWorker();

  const getUserThemes = (page, userId) => {
    profileApiWorker.getUserThemes(page, userId).then((response) => {
      if (response.data.length === 0) {
        setIsThemeLastPage(true);
      } else {
        setThemes(response.data);
        profileApiWorker.getUserThemes(page + 1, userId).then((response) => {
          if (response.data.length === 0) {
            setIsThemeLastPage(true);
          }
        });
      }
    });
  };

  const getUserComments = (page, userId) => {
    profileApiWorker.getUserComments(page, userId).then((response) => {
      if (response.data.length == 0) {
        setIsCommentLastPage(true);
      } else {
        setComments(response.data);
        profileApiWorker.getUserComments(page + 1, userId).then((response) => {
          if (response.data.length == 0) {
            setIsCommentLastPage(true);
          }
        });
      }
    });
  };

  const updateNickname = () => {
    if (nickname != "" && nickname != user.nickname) {
      PutData("nickname", nickname);
      setNickname("");
    } else {
      alert("Некоректное поле");
    }
  };

  const updateLogin = () => {
    if (login != "" && login != user.login) {
      PutData("login", login);
      setLogin("");
    } else {
      alert("Некоректное поле");
    }
  };

  const updatePassword = () => {
    if (password != "" && password != user.password) {
      PutData("password", password);
      setPassword("");
    } else {
      alert("Некоректное поле");
    }
  };

  const updateEMail = () => {
    if (eMail != "" && eMail != user.eMail) {
      PutData("eMail", eMail);
      setEMail("");
    } else {
      alert("Некоректное поле");
    }
  };

  const PutData = (field, value) => {
    if (field.length > 12 || field.length < 6) {
      alert("Не менее символов 6 и не более 12 символов");
    } else {
      profileApiWorker
        .refreshUserData(user.id, field, value)
        .then((response) => {
          if (response.data == "") {
            profileApiWorker
              .getUserById(user.id)
              .then((response) => {
                setUser(response.data);
                localStorage.setItem("User", JSON.stringify(response.data));
              })
              .catch((error) => console.log("error"));
          } else {
            alert(response.data);
          }
        })
        .catch((error) => console.log("error"));
    }
  };

  const uploadFile = () => {
    var file = document.getElementById("input").files[0];
    if (file !== undefined) {
      var reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function () {
        setDataURL(btoa(reader.result));

        console.log(dataURL);
        let userWithPicture = {
          id: 0,
          nickname: "",
          login: "",
          password: "",
          eMail: "",
          profilePicture: dataURL,
          comments: [],
          themes: [],
        };

        profileApiWorker
          .refreshUserPicture(user.id, userWithPicture)
          .then((response) => {
            if (response.data == "")
              profileApiWorker
                .getUserById(user.id)
                .then((response) => {
                  if (response.data != null) {
                    console.log(1);
                    setUser(response.data);
                    localStorage.setItem("User", JSON.stringify(response.data));
                  }
                })
                .catch((error) => console.log("error"));
          });
      };
      reader.onerror = function () {
        console.log("problems");
      };
    } else {
      alert("Вы не загрузили изображение");
    }
  };

  useEffect(() => {
    getUserThemes(themePage, user.id);
    getUserComments(commentPage, user.id);
  }, []);

  const nextThemePage = () => {
    themePage += 1;
    setThemePage(themePage);

    getUserThemes(themePage, user.id);
  };

  const lastThemePage = () => {
    if (themePage != 1) {
      themePage -= 1;
      setThemePage(themePage);
      getUserThemes(themePage, user.id);
      setIsThemeLastPage(false);
    }
  };

  const nextCommentPage = () => {
    commentPage += 1;
    setCommentPage(commentPage);

    getUserComments(commentPage, user.id);
  };

  const lastCommentPage = () => {
    if (commentPage != 1) {
      commentPage -= 1;
      setCommentPage(commentPage);
      getUserComments(commentPage, user.id);
      setIsCommentLastPage(false);
    }
  };

  return (
    <div>
      <section>
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body text-center">
                  <img
                    src={"data:image/png;base64," + user.profilePicture}
                    width={700}
                    height={700}
                    class="rounded-circle img-fluid"
                  />
                  <input class="my-3 form-control" type="file" id="input" />
                  <div class="d-flex my-3 justify-content-center mb-2">
                    <button
                      onClick={uploadFile}
                      type="button"
                      class="btn btn-outline-dark ms-1"
                    >
                      Изменить изображение
                    </button>
                  </div>
                  <div class="d-flex my-3 justify-content-center mb-2">
                    <form class="btn me-2" action="/">
                      <button class="btn btn-outline-dark">На главную</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-2">
                      <p class="">Псевдоним</p>
                    </div>
                    <div class="justify-content-center col-lg-7">
                      <input
                        id="nickname"
                        class="form-control"
                        placeholder={user.nickname}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />{" "}
                    </div>
                    <div class="col-lg-3 justify-content-center">
                      <button
                        onClick={updateNickname}
                        type="button"
                        class="btn btn-outline-dark ms-1"
                      >
                        Изменить
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-lg-2">
                      <p class="">Логин</p>
                    </div>
                    <div class="justify-content-center col-lg-7">
                      <input
                        id="login"
                        class="form-control"
                        placeholder={user.login}
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />{" "}
                    </div>
                    <div class="col-lg-3 justify-content-center">
                      <button
                        onClick={updateLogin}
                        type="button"
                        class="btn btn-outline-dark ms-1"
                      >
                        Изменить
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-lg-2">
                      <p class="">Пароль</p>
                    </div>
                    <div class="justify-content-center col-lg-7">
                      <input
                        id="password"
                        class="form-control"
                        placeholder={user.password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />{" "}
                    </div>
                    <div class="col-lg-3 justify-content-center">
                      <button
                        onClick={updatePassword}
                        type="button"
                        class="btn btn-outline-dark ms-1"
                      >
                        Изменить
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-lg-2">
                      <p class="">E-mail</p>
                    </div>
                    <div class="justify-content-center col-lg-7">
                      <input
                        id="eMail"
                        class="form-control"
                        placeholder={user.eMail}
                        value={eMail}
                        onChange={(e) => setEMail(e.target.value)}
                      />{" "}
                    </div>
                    <div class="col-lg-3 justify-content-center">
                      <button
                        onClick={updateEMail}
                        type="button"
                        class="btn btn-outline-dark ms-1"
                      >
                        Изменить
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Колличество обсуждений</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{themes.length}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Колличество комменатриев</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{comments.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4 text-center">Обсуждения</p>
                      {themes.map((theme) => {
                        return <UserTheme theme={theme} key={theme.id} />;
                      })}
                      {themes.length != 0 ? (
                        <nav
                          class="w-100 my-3 justify-content-center text-dark  navbar navbar-expand-lg navbar-light bg-light"
                          aria-label="Page navigation example"
                        >
                          <ul class=" pagination">
                            {themePage != 1 ? (
                              <li class="page-item">
                                <a
                                  onClick={lastThemePage}
                                  class="text-dark page-link"
                                  href="#!"
                                >
                                  Назад
                                </a>
                              </li>
                            ) : (
                              <div></div>
                            )}
                            {themePage == 1 && isThemeLastPage == true ? (
                              <div></div>
                            ) : (
                              <li class="page-item">
                                <a class="text-dark page-link" href="#!">
                                  {themePage}
                                </a>
                              </li>
                            )}
                            {isThemeLastPage == false ? (
                              <li class="page-item">
                                <a
                                  onClick={nextThemePage}
                                  class=" text-dark page-link"
                                  href="#!"
                                >
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
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4 text-center">Комментарии</p>
                      {comments.map((comment) => {
                        return (
                          <UserComment comment={comment} key={comment.id} />
                        );
                      })}
                      <nav
                        class="w-100 my-3 justify-content-center text-dark  navbar navbar-expand-lg navbar-light bg-light"
                        aria-label="Page navigation example"
                      >
                        <ul class=" pagination">
                          {commentPage != 1 ? (
                            <li class="page-item">
                              <a
                                onClick={lastCommentPage}
                                class="text-dark page-link"
                                href="#!"
                              >
                                Назад
                              </a>
                            </li>
                          ) : (
                            <div></div>
                          )}
                          {commentPage == 1 && isCommentLastPage == true ? (
                            <div></div>
                          ) : (
                            <li class="page-item">
                              <a class="text-dark page-link" href="#!">
                                {commentPage}
                              </a>
                            </li>
                          )}
                          {isCommentLastPage == false ? (
                            <li class="page-item">
                              <a
                                onClick={nextCommentPage}
                                class=" text-dark page-link"
                                href="#!"
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileForm;
