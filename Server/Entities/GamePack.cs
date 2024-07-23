namespace Server.Entities
{
    public class GamePack
    {
        public Game Game { get; set; }
        public List<Jenre> Genres { get; set; } = new List<Jenre>();
        public List<Platform> Platforms { get; set; } = new List<Platform>();
    }
}
