import { useState } from "react";
import GameChatApiWorker from "../Api/Api";

const Comment = ({ comment }) => {
  let theme = JSON.parse(localStorage.getItem("Theme"));
  let user = JSON.parse(localStorage.getItem("User"));
  let [isAnswer, setIsAnswer] = useState(0);
  let commentsApiWorker = new GameChatApiWorker();

  const deleteComment = () => {
    commentsApiWorker
      .deleteComment(comment.id)
      .then(() => {
        localStorage.setItem("CommentId", JSON.stringify(comment.id));
        window.location.href = "/commentForm";
      })
      .catch();
  };

  const refreshComment = () => {
    commentsApiWorker
      .refreshComment(comment)
      .then(() => {
        window.location.href = "/CommentForm";

        //commentsApiWorker.getComment(comment.id).then((response)=> comment = response.data).catch();
      })
      .catch();
  };

  return (
    <div>
      {user !== null && user.id == comment.user.id ? (
        <div id={comment.id} class="d-flex flex-start mb-4">
          {" "}
          <img
            class="rounded-circle shadow-1-strong me-3"
            src={"data:image/png;base64," + comment.user.profilePicture}
            width="65"
            height="65"
          />
          <div class="card">
            <div class="card-body p-4">
              <div class="">
                <div>
                  <div
                    onClick={() => {
                      if (comment.commentId != 0) {
                        window.location.href = `#${comment.commentId}`;
                      }
                    }}
                  >
                    <h5>{comment.user.nickname}</h5>
                    <p class="small">{comment.date}</p>
                  </div>
                  <textarea
                    onChange={(e) => (comment.text = e.target.value)}
                    class="form-control mb-0"
                  >
                    {comment.text}
                  </textarea>
                </div>
                <div>
                  <div
                    href="#!"
                    class="d-flex my-3 justify-content-between align-items-center"
                  >
                    <a onClick={refreshComment} class="btn btn-outline-dark">
                      {" "}
                      Изменить
                    </a>
                  </div>

                  <div
                    href="#!"
                    class="d-flex my-3 justify-content-between align-items-center"
                  >
                    <button onClick={deleteComment} class="btn btn-danger">
                      {" "}
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div href="#!" id={comment.id} class="d-flex flex-start mb-4">
            {" "}
            <img
              class="rounded-circle shadow-1-strong me-3"
              src={
                "https://avatars.dzeninfra.ru/get-zen_doc/1899873/pub_5dcdb90634bb04739962fe7b_5dd29488e5968126aa191e1a/scale_1200"
              }
              width="65"
              height="65"
            />
            <div class="card w-100">
              <div class="card-body p-4">
                <div class="">
                  <div
                    onClick={() => {
                      if (comment.commentId != 0) {
                        window.location.href = `#${comment.commentId}`;
                      }
                    }}
                  >
                    <h5>{comment.user.nickname}</h5>
                    <p class="small">{comment.date}</p>
                    <p>{comment.text}</p>
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <a
                      onClick={() => {
                        if (user == null) {
                          window.location.href = "/signInForm";
                        } else {
                          setIsAnswer(comment.id);
                        }
                      }}
                      href="#!"
                      class="link-muted"
                    >
                      <i class="fas fa-reply me-1"></i> Ответить
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAnswer == comment.id ? (
        <div class="text-end card-body py-3 border-0">
          <div class="form-outline">
            <textarea
              id={`answerText${comment.id}`}
              class="form-control"
              rows="2"
            ></textarea>
          </div>
          <div class="btn-group mt-2 pt-1">
            <button
              onClick={() => {
                let answer = {
                  id: 0,
                  text: `${comment.user.nickname}, ${
                    document.getElementById(`answerText${comment.id}`).value
                  }`,
                  userId: user.id,
                  themeId: theme.id,
                  commentId: comment.id,
                  date: "",
                  userNickname: user.nickname,
                };

                if (
                  document.getElementById(`answerText${comment.id}`).value !==
                  ""
                ) {
                  commentsApiWorker
                    .addNewComment(answer)
                    .then(() => (window.location.href = "/CommentForm"))
                    .catch((error) => {
                      console.log("POST Error");
                    });
                  window.location.href = "#nav";
                } else {
                  alert("Ваш комментарий не может быть пустым!");
                }
              }}
              type="button"
              class="btn btn-dark btn-sm"
            >
              Опубликовать
            </button>
            <button
              onClick={() => {
                setIsAnswer(0);
              }}
              type="button"
              class="btn btn-outline-dark btn-sm"
            >
              Отменить
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Comment;
