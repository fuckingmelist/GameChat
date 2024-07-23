import GameChatApiWorker from "../GameChatComponents/Api/Api";

const UserComment = ({ comment }) => {
  let commentApiWorker = new GameChatApiWorker();

  const goToComment = () => {
    console.log(1);
    commentApiWorker
      .findCommentPage(comment)
      .then((response) => {
        localStorage.setItem("CommentPage", JSON.stringify(response.data));
        commentApiWorker.getThemeById(comment.themeId).then((response)=>{
          localStorage.setItem("Theme", JSON.stringify(response.data));
          localStorage.setItem("CommentId", JSON.stringify(comment.id));
           window.location.href = "/commentForm";
        }).catch();
      })
      .catch();
  };
  
  return (
    <form>
      <div class=" my-3 form-outline">
        <p id={"textarea" + comment.id} class="form-control" rows="4">
          {comment.text}
        </p>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <button onClick={goToComment} type="button" class="btn btn-dark">
          Перейти к комментарию
        </button>
      </div>
    </form>
  );
};

export default UserComment;
