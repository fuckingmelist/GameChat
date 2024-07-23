using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Models;
//using Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        Model _model = new Model();

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{page}/{id}/{type}")]
        public List<Comment> GetComments(int page, int id, int type)
        {
            if (type == 0)
            {
                return _model.GetComments(page, id);
            }
            else
            {
                return _model.GetCommentsByUserId(page, id);
            }
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPost("{id}/{themeId}")]
        public int GetCommentPage(int id, int themeId)
        {
            return _model.GetCommentPage(id, themeId);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpDelete("{commentId}")]
        public void DeleteComment(int commentId)
        {
             _model.DeleteComment(commentId);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{page}/{userId}")]
        public List<Comment> GetUserComments(int page, int userId)
        {
            return _model.GetUserComments(page, userId);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPost]
        public void AddComment([FromBody] Comment comment)
        {
            comment.Date = DateTime.Now.ToString("g");
            _model.AddComment(comment);
            return;
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPut]
        public void UpdateComment([FromBody] Comment comment)
        {
          _model.EditComment(comment);
        }
    }
}
