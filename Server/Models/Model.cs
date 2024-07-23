using Server.Entities;
using System.Net;
using System.Text;

namespace Server.Models
{
    public class Model
    {
        #region User CRUD
        public User FindUser(string login, string password)
        {
            using (GamechatContext db = new GamechatContext())
            {
                return db.Users.Where(x => x.Login == login && x.Password == password).FirstOrDefault();
            }
        }

        public string AddUser(User user)
        {
            using (GamechatContext db = new GamechatContext())
            {
                User realUser = db.Users.Where(x => x.Login == user.Login).FirstOrDefault();
                if (realUser == null)
                {
                    if (user.ProfilePicture == null)
                    {
                        WebClient webClient = new WebClient();
                        user.ProfilePicture = webClient.DownloadData("https://avatars.dzeninfra.ru/get-zen_doc/1899873/pub_5dcdb90634bb04739962fe7b_5dd29488e5968126aa191e1a/scale_1200");
                    }

                    db.Users.Add(user);
                    db.SaveChanges();
                    return null;
                }
                else
                {
                    return "Пользователь с таким логином уже существует";
                }
            }
        }

        public Game GetGameById(int id)
        {
            using (GamechatContext db = new GamechatContext())
            {
                Game game = db.Games.Where(x => x.Id == id).FirstOrDefault();
                return game;
            }
        }

        public Theme GetThemeById(int id)
        {
            using (GamechatContext db = new GamechatContext())
            {
                Theme theme = db.Themes.Where(x => x.Id == id).FirstOrDefault();
                return theme;
            }
        }

        public int GetCommentPage(int id, int themeId)
        {
            int page = 1;

            List<Comment> comments = new List<Comment>();

            int pageSize = 40;
            bool isFinded = true;

            while (isFinded)
            {
                using (GamechatContext dbComment = new GamechatContext())
                {
                    comments = dbComment.Comments.Where(x => x.ThemeId == themeId).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                    for (int i = 0; i < comments.Count; i++)
                    {
                        if (comments[i].Id == id)
                        {
                            isFinded = false;
                        }
                    }
                    if (isFinded == true)
                    {
                        page += 1;
                    }
                }
            }

            return page;
        }

        public Comment GetCommentById(int id)
        {
            using (GamechatContext db = new GamechatContext())
            {
                Comment comment = db.Comments.Where(x => x.Id == id).FirstOrDefault();
                return comment;
            }
        }

        public List<GamePack> GetGameBySearch(int page, Game game)
        {
            int pageSize = 30;
            List<GamePack> gamePacks = new List<GamePack>();
            using (GamechatContext db = new GamechatContext())
            {
                List<Game> games = db.Games.Where(x => x.Title.Contains(game.Title.TrimStart().TrimEnd())).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                for (int i = 0; i < games.Count; i++)
                {
                    List<GameJenre> jenres = db.GameJenres.Where(x => x.GameId == games[i].Id).ToList();
                    gamePacks.Add(new GamePack() { Game = games[i] });

                    for (int j = 0; j < jenres.Count; j++)
                    {
                        using (GamechatContext dbJenre = new GamechatContext())
                        {
                            int id = jenres[j].JenreId;
                            string title = title = dbJenre.Jenres.Where(x => x.Id == id).FirstOrDefault().Title;
                            if (j != (jenres.Count - 1))
                                title += ",";
                            gamePacks[i].Genres.Add(new Jenre() { Id = id, Title = title });
                        }
                    }

                    List<GamePlatform> platfrorms = db.GamePlatforms.Where(x => x.GameId == games[i].Id).ToList();

                    for (int j = 0; j < platfrorms.Count; j++)
                    {
                        using (GamechatContext dbPlatform = new GamechatContext())
                        {
                            int id = platfrorms[j].PlatformId;
                            string title = dbPlatform.Platforms.Where(x => x.Id == id).FirstOrDefault().Title;
                            if (j != (platfrorms.Count - 1))
                                title += ",";
                            gamePacks[i].Platforms.Add(new Platform() { Id = id, Title = title });
                        }
                    }
                }

                return gamePacks;
            }
        }

        public string RefreshUserPicture(int userId, User user)
        {
            using (GamechatContext db = new GamechatContext())
            {
                User oldUser = db.Users.Where(x => x.Id == userId).FirstOrDefault();

                oldUser.ProfilePicture = user.ProfilePicture;

                db.Users.Update(oldUser);
                db.SaveChanges();

                return "";
            }
        }

        public User FindUserById(int id)
        {
            using (GamechatContext db = new GamechatContext())
            {
                User findedUser = db.Users.Where(x => x.Id == id).FirstOrDefault();

                return findedUser;
            }
        }

        public string RefreshUserData(int userId, string field, string value)
        {
            using (GamechatContext db = new GamechatContext())
            {
                User user = db.Users.Where(x => x.Id == userId).FirstOrDefault();

                if (field == "nickname" && value != user.Nickname)
                {
                    user.Nickname = value;
                    db.Users.Update(user);
                    db.SaveChanges();
                    return null;
                }
                else if (field == "login")
                {
                    if (db.Users.Where(x => x.Login == value).FirstOrDefault() == null)
                    {
                        user.Login = value;
                        db.Users.Update(user);
                        db.SaveChanges();
                        return null;
                    }
                    else
                    {
                        return "Логин занят";
                    }
                }
                else if (field == "password")
                {
                    user.Password = value;
                    db.Users.Update(user);
                    db.SaveChanges();

                    return null;
                }
                else if (field == "eMail")
                {
                    user.EMail = value;
                    db.Users.Update(user);
                    db.SaveChanges();

                    return null;
                }
                else
                {
                    return "Вы не изменили поля";
                }
            }
        }
        #endregion

        #region Theme CRUD

        public List<Theme> GetUserThemes(int page, int userId)
        {
            int pageSize = 3;

            using (GamechatContext db = new GamechatContext())
            {
                List<Theme> userThemes = db.Themes.Where(x => x.UserId == userId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                return userThemes;
            }
        }

        public List<Theme> GetThemes(int page, int gameId, int userId)
        {
            List<Theme> themes = new List<Theme>();
            int pageSize = 20;

            using (GamechatContext db = new GamechatContext())
            {
                List<Theme> userThemes = db.Themes.Where(x => x.GameId == gameId && x.UserId == userId).ToList();

                if (page == 1)
                {

                    for (int i = 0; i < userThemes.Count; i++)
                    {
                        themes.Add(userThemes[i]);
                    }

                    List<Theme> otherThemes = db.Themes.Where(x => x.GameId == gameId && x.UserId != userId).Take(pageSize - userThemes.Count).ToList();

                    for (int i = 0; i < otherThemes.Count; i++)
                    {
                        themes.Add(otherThemes[i]);
                    }
                }
                else
                {
                    themes = db.Themes.Where(x => x.GameId == gameId && x.UserId != userId).Skip((page - 1) * (pageSize - userThemes.Count)).Take(pageSize).ToList();
                }
            }

            return themes;
        }

        public List<Theme> GetThemesByUserId(int id)
        {
            List<Theme> themes;
            using (GamechatContext db = new GamechatContext())
            {
                themes = db.Themes.Where(x => x.UserId == id).ToList();
            }

            return themes;
        }

        public string AddTheme(Theme theme)
        {
            using (GamechatContext db = new GamechatContext())
            {
                List<Theme> themes = db.Themes.Where(x => x.GameId == theme.GameId && x.UserId == theme.UserId).ToList();

                if (themes.Count != 5)
                {
                    db.Themes.Add(theme);
                    db.SaveChanges();
                    return "";
                }
                else
                {
                    return "Вы можете создать не более 5 тем для одной игры!";
                }

            }
        }

        public void DeleteTheme(int id)
        {
            using (GamechatContext db = new GamechatContext())
            {
                Theme theme = new Theme() { Id = id };

                List<Comment> comments = new List<Comment>();
                comments = db.Comments.Where(x => x.ThemeId == id).ToList();

                for (int i = 0; i < comments.Count; i++)
                {
                    db.Comments.Remove(comments[i]);
                    db.SaveChanges();
                }

                db.Themes.Remove(theme);
                db.SaveChanges();
            }
        }

        #endregion

        #region Game CRUD
        public List<GamePack> GetGames(int page)
        {
            List<GamePack> gamePacks = new List<GamePack>();
            int pageSize = 30;

            using (GamechatContext db = new GamechatContext())
            {
                List<Game> games = db.Games.Skip((page - 1) * pageSize).Take(pageSize).ToList();

                for (int i = 0; i < games.Count; i++)
                {
                    List<GameJenre> jenres = db.GameJenres.Where(x => x.GameId == games[i].Id).ToList();
                    gamePacks.Add(new GamePack() { Game = games[i] });

                    for (int j = 0; j < jenres.Count; j++)
                    {
                        using (GamechatContext dbJenre = new GamechatContext())
                        {
                            int id = jenres[j].JenreId;
                            string title = title = dbJenre.Jenres.Where(x => x.Id == id).FirstOrDefault().Title;
                            if (j != (jenres.Count - 1))
                                title += ",";
                            gamePacks[i].Genres.Add(new Jenre() { Id = id, Title = title });
                        }
                    }

                    List<GamePlatform> platfrorms = db.GamePlatforms.Where(x => x.GameId == games[i].Id).ToList();

                    for (int j = 0; j < platfrorms.Count; j++)
                    {
                        using (GamechatContext dbPlatform = new GamechatContext())
                        {
                            int id = platfrorms[j].PlatformId;
                            string title = dbPlatform.Platforms.Where(x => x.Id == id).FirstOrDefault().Title;
                            if (j != (platfrorms.Count - 1))
                                title += ",";
                            gamePacks[i].Platforms.Add(new Platform() { Id = id, Title = title });
                        }
                    }
                }
            }

            return gamePacks;
        }

        public List<GamePack> GetFilteredGames(int page, string genre, string platform, string rating)
        {
            List<GamePack> gamePacks = new List<GamePack>();
            int pageSize = 30;

            using (GamechatContext db = new GamechatContext())
            {
                List<Game> games = new List<Game>();

                Jenre selectedJenre = db.Jenres.Where(x => x.Title == genre).FirstOrDefault();
                Platform selectedPlatform = db.Platforms.Where(x => x.Title == platform).FirstOrDefault();

                if (genre != "null")
                {
                    List<GameJenre> findedJenres = db.GameJenres.Where(x => x.JenreId == selectedJenre.Id).ToList();
                    if (platform != "null")
                    {
                        List<GamePlatform> findedPlatfroms = new List<GamePlatform>();

                        for (int i = 0; i < findedJenres.Count; i++)
                        {
                            using (GamechatContext dbFilter = new GamechatContext())
                            {
                                if (dbFilter.GamePlatforms.Where(x => x.PlatformId == selectedPlatform.Id && x.GameId == findedJenres[i].GameId).FirstOrDefault() != null)
                                {
                                    findedPlatfroms.Add(dbFilter.GamePlatforms.Where(x => x.PlatformId == selectedPlatform.Id && x.GameId == findedJenres[i].GameId).FirstOrDefault());
                                }
                            }
                        }

                        if (rating != "null")
                        {
                            List<Game> filteredGames = new List<Game>();

                            for (int i = 0; i < findedPlatfroms.Count; i++)
                            {
                                using (GamechatContext dbFilter = new GamechatContext())
                                {
                                    filteredGames.Add(dbFilter.Games.Where(x => x.Id == findedPlatfroms[i].GameId).FirstOrDefault());
                                }
                            }

                            if (rating == "Низкий")
                                games = filteredGames.OrderBy(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                            else
                                games = filteredGames.OrderByDescending(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                        }
                        else
                        {
                            for (int i = ((page - 1) * pageSize); i < ((page - 1) * pageSize) + pageSize && i < findedPlatfroms.Count; i++)
                            {
                                using (GamechatContext dbFilter = new GamechatContext())
                                {
                                    games.Add(dbFilter.Games.Where(x => x.Id == findedPlatfroms[i].GameId).FirstOrDefault());
                                }
                            }
                        }

                    }
                    else
                    {
                        if (rating != "null")
                        {
                            List<Game> filteredGames = new List<Game>();

                            for (int i = 0; i < findedJenres.Count; i++)
                            {
                                using (GamechatContext dbJenre = new GamechatContext())
                                {
                                    filteredGames.Add(dbJenre.Games.Where(x => x.Id == findedJenres[i].GameId).FirstOrDefault());
                                }
                            }

                            if (rating == "Низкий")
                                games = filteredGames.OrderBy(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                            else
                                games = filteredGames.OrderByDescending(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                        }
                        else
                        {
                            for (int i = ((page - 1) * pageSize); i < ((page - 1) * pageSize) + pageSize && i < findedJenres.Count; i++)
                            {
                                using (GamechatContext dbJenre = new GamechatContext())
                                {
                                    games.Add(dbJenre.Games.Where(x => x.Id == findedJenres[i].GameId).FirstOrDefault());
                                }
                            }
                        }
                    }
                }
                else if (platform != "null")
                {
                    List<GamePlatform> findedPlatfroms = db.GamePlatforms.Where(x => x.PlatformId == selectedPlatform.Id).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                    if (rating != "null")
                    {
                        List<Game> filteredGames = new List<Game>();

                        for (int i = 0; i < findedPlatfroms.Count; i++)
                        {
                            using (GamechatContext dbFilter = new GamechatContext())
                            {
                                filteredGames.Add(dbFilter.Games.Where(x => x.Id == findedPlatfroms[i].GameId).FirstOrDefault());
                            }
                        }

                        if (rating == "Низкий")
                            games = filteredGames.OrderBy(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                        else
                            games = filteredGames.OrderByDescending(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                    }
                    else
                    {
                        for (int i = 0; i < findedPlatfroms.Count; i++)
                        {
                            using (GamechatContext dbFilter = new GamechatContext())
                            {
                                games.Add(dbFilter.Games.Where(x => x.Id == findedPlatfroms[i].GameId).FirstOrDefault());
                            }
                        }
                    }
                }
                else if (platform == "null" && genre == "null")
                {
                    if (rating == "Низкий")
                        games = db.Games.OrderBy(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                    else
                        games = db.Games.OrderByDescending(x => x.AvgRating).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                }

                for (int i = 0; i < games.Count; i++)
                {
                    List<GameJenre> jenres = db.GameJenres.Where(x => x.GameId == games[i].Id).ToList();
                    gamePacks.Add(new GamePack() { Game = games[i] });

                    for (int j = 0; j < jenres.Count; j++)
                    {
                        using (GamechatContext dbJenre = new GamechatContext())
                        {
                            int id = jenres[j].JenreId;
                            string title = title = dbJenre.Jenres.Where(x => x.Id == id).FirstOrDefault().Title;
                            if (j != (jenres.Count - 1))
                                title += ",";
                            gamePacks[i].Genres.Add(new Jenre() { Id = id, Title = title });
                        }
                    }

                    List<GamePlatform> platfrorms = db.GamePlatforms.Where(x => x.GameId == games[i].Id).ToList();

                    for (int j = 0; j < platfrorms.Count; j++)
                    {
                        using (GamechatContext dbPlatform = new GamechatContext())
                        {
                            int id = platfrorms[j].PlatformId;
                            string title = dbPlatform.Platforms.Where(x => x.Id == id).FirstOrDefault().Title;
                            if (j != (platfrorms.Count - 1))
                                title += ",";
                            gamePacks[i].Platforms.Add(new Platform() { Id = id, Title = title });
                        }
                    }
                }
            }

            return gamePacks;
        }
        #endregion

        #region Comment CRUD

        public List<Comment> GetUserComments(int page, int userId)
        {
            int pageSize = 3;

            using (GamechatContext db = new GamechatContext())
            {
                List<Comment> userComments = db.Comments.Where(x => x.UserId == userId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                return userComments;
            }
        }

        public List<Comment> GetComments(int page, int themeId)
        {
            List<Comment> comments = new List<Comment>();

            int pageSize = 40;

            using (GamechatContext db = new GamechatContext())
            {
                comments = db.Comments.Where(x => x.ThemeId == themeId).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                for (int i = 0; i < comments.Count; i++)
                {
                    using (GamechatContext dbComment = new GamechatContext())
                    {
                        comments[i].User = dbComment.Users.Where(x => x.Id == comments[i].UserId).FirstOrDefault();
                        if (comments[i].User == null)
                        {
                            comments[i].User = new User() { Nickname = "user" + CreateRandomValueField(8) };
                        }
                    }
                }

            }

            return comments;
        }

        public static byte[] GetImageBytes(string url)
        {
            WebClient webClient = new WebClient();
            return webClient.DownloadData(url);
        }

        public static string CreateRandomValueField(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        public List<Comment> GetCommentsByUserId(int page, int userId)
        {
            List<Comment> comments;
            int pageSize = 3;

            using (GamechatContext db = new GamechatContext())
            {
                comments = db.Comments.Where(x => x.UserId == userId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            }

            return comments;
        }

        public void AddComment(Comment comment)
        {
            using (GamechatContext db = new GamechatContext())
            {
                db.Comments.Add(comment);
                db.SaveChanges();
            }
        }

        public void EditComment(Comment newComment)
        {
            using (GamechatContext db = new GamechatContext())
            {
                newComment.Date = $"Отредактировано {DateTime.Now.ToString("f")}";
                db.Comments.Update(newComment);
                db.SaveChanges();
            }
        }

        public void DeleteComment(int id)
        {
            using (GamechatContext db = new GamechatContext())
            {
                Comment comment = new Comment() { Id = id };
                db.Comments.Remove(comment);
                db.SaveChanges();
            }
        }

        #endregion

        public List<Jenre> GetJenres()
        {
            List<Jenre> genres;
            using (GamechatContext db = new GamechatContext())
            {
                genres = db.Jenres.ToList();
            }

            return genres;
        }

        public List<Platform> GetPlatfroms()
        {
            List<Platform> platforms;
            using (GamechatContext db = new GamechatContext())
            {
                platforms = db.Platforms.OrderBy(x => x.Id).ToList();
            }

            return platforms;
        }
    }
}
