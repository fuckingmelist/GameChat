import GameChatApiWorker from "../Api/Api";
import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";

const CommentForm = () => {
  let [comments, setComments] = useState([]);
  let [page, setPage] = useState(
    JSON.parse(localStorage.getItem("CommentPage"))
  );
  let [isLastPage, setIsLastPage] = useState(false);
  let theme = JSON.parse(localStorage.getItem("Theme"));
  let user = JSON.parse(localStorage.getItem("User"));
  let commentId = JSON.parse(localStorage.getItem("CommentId"));

  let commentsApiWorker = new GameChatApiWorker();

  const getComments = (page, themeId) => {
    console.log(page, themeId);
    commentsApiWorker
      .getAllComments(page, themeId)
      .then((response) => {
        setComments(response.data);
        console.log(response.data.length);
        commentsApiWorker
          .getAllComments(page + 1, themeId)
          .then((response) => {
            console.log(response.data.length);

            if (commentId !== null) {
              window.location.href = `#${commentId}`;
              localStorage.removeItem("CommentId");
            }

            if (response.data.length == 0) {
              setIsLastPage(true);
            }
          })
          .catch(console);
      })
      .catch(console);
  };

  useEffect(() => {
    getComments(page, theme.id);
  }, []);

  const addComment = () => {
    if (user == null) {
      window.location.href = "/signInForm";
    } else {
      let comment = {
        id: 0,
        text: document.getElementById("text").value,
        userId: user.id,
        themeId: theme.id,
        commentId: 0,
        date: "",
        userNickname: user.nickname,
      };

      if (comment.text !== "") {
        commentsApiWorker
          .addNewComment(comment)
          .then(() => getComments(page, theme.id))
          .catch((error) => {
            console.log("POST Error");
          });
      } else {
        alert("Ваш комментарий не может быть пустым!");
      }
    }
  };

  const nextPage = () => {
    page += 1;
    setPage(page);
    localStorage.setItem("CommentPage", JSON.stringify(page));
    getComments(page, theme.id);
  };

  const lastPage = () => {
    if (page != 1) {
      page -= 1;
      setPage(page);
      setIsLastPage(false);
      localStorage.setItem("CommentPage", JSON.stringify(page));
      getComments(page, theme.id);
    }
  };

  return (
    <div>
      <div class="row d-flex justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-0 border">
            <div class="card-body p-4">
              <div class="row d-flex justify-content-center form-outline mb-4">
                <h1 class="text-center">{theme.title}</h1>
                <div class="d-flex flex-start w-100">
                  <div class="w-100">
                    <h5>Новый комментарий</h5>
                    <div class="form-outline">
                      <textarea
                        id="text"
                        class="form-control"
                        rows="4"
                        onClick={() => {
                          if (user == null) {
                            window.location.href = "/signInForm";
                          }
                        }}
                      ></textarea>
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                      <button
                        onClick={addComment}
                        type="button"
                        class="btn btn-dark"
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
                </div>

                <section>
                  <div class="container my-3 py-5 text-dark">
                    <div class="row d-flex justify-content-center">
                      <div class="col-md-11 col-lg-9 col-xl-7">
                        {comments.length === 0 ? (
                          <h1 class="my-3 text-center"></h1>
                        ) : (
                          comments.map((comment) => {
                            return (
                              <Comment comment={comment} key={comment.id} />
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <nav
                  id="nav"
                  class="w-100 justify-content-center text-dark  navbar navbar-expand-lg navbar-light bg-light"
                  aria-label="Page navigation example"
                >
                  <ul class=" pagination">
                    {page == 1 ? (
                      <div></div>
                    ) : (
                      <li class="page-item">
                        <a
                          onClick={lastPage}
                          class="text-dark page-link"
                          href="#"
                        >
                          Назад
                        </a>
                      </li>
                    )}
                    {(page == 1) & (isLastPage == true) ? (
                      <div></div>
                    ) : (
                      <li class="page-item">
                        <a class="text-dark page-link" href="#">
                          {page}
                        </a>
                      </li>
                    )}
                    {isLastPage == false ? (
                      <li>
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
    </div>
  );
};

export default CommentForm;
