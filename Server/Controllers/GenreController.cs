using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {

        private Model _model = new Model();

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet]
        public List<Jenre> Get()
        {
            return _model.GetJenres();
        }
    }
}
