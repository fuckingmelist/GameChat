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
    public class ThemeController : ControllerBase
    {
        private Model _model = new Model();

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{page}/{gameId}/{userId}")]
        public List<Theme> GetThemes(int page, int gameId, int userId)
        {
            return _model.GetThemes(page, gameId, userId);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{page}/{userId}")]
        public List<Theme> GetUserThemes(int page, int userId)
        {
            return _model.GetUserThemes(page, userId);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{id}")]
        public Theme GetUserThemes(int id)
        {
            return _model.GetThemeById(id);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPost]
        public string AddTheme([FromBody] Theme theme)
        {
            return _model.AddTheme(theme);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _model.DeleteTheme(id);
            return;
        }
    }
}
