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
    public class UserController : ControllerBase
    {
        private Model _model = new Model();

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{login}/{password}")]
        public User Get(string login, string password)
        {
            return _model.FindUser(login, password);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _model.FindUserById(id);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPost]
        public string Post([FromBody] User user)
        {
            return _model.AddUser(user);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPut("{userId}/{field}/{data}")]
        public string Put(int userId, string field, string data)
        {
            return _model.RefreshUserData(userId, field, data);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPut("{userId}")]
        public string Put(int userId, [FromBody] User user)
        {
            return _model.RefreshUserPicture(userId, user);
        }
    }
}
