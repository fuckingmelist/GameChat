using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private Model _model = new Model();

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpGet("{page}")]
        public List<GamePack> GetAllGames(int page)
        {
            return _model.GetGames(page);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPost]
        public Game GetGameByThemeId([FromBody] Theme theme)
        {
            return _model.GetGameById(theme.GameId);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPut("{page}/{rating}")]
        public List<GamePack> GetFilteredGames(int page, string rating, [FromBody] GameFilter gameFilter)
        {
            return _model.GetFilteredGames(page, gameFilter.Genre, gameFilter.Platform, rating);
        }

        [EnableCors("Access-Control-Allow-Origin")]
        [HttpPost("{page}")]
        public List<GamePack> GetGameBySearch(int page, [FromBody] Game game)
        {
            return _model.GetGameBySearch(page, game);
        }
    }

    public class GameFilter
    {
        public string Platform { get; set; }
        public string Genre { get; set; }
    }
}
