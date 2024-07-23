import axios from "axios";

class GameChatApiWorker {
  #axios;

  constructor() {
    this.#axios = axios.create({ baseURL: "https://localhost:7016/api" });
  }

  async deleteComment(commentId) {
    return await this.#axios.delete(`/Comment/${commentId}`);
  }

  async refreshComment(comment) {
    return await this.#axios.put("/Comment", comment);
  }

  async getComment(id) {
    return await this.#axios.get(`/Comment/${id}`);
  }

  async getAllGames(page) {
    return await this.#axios.get(`/Game/${page}`);
  }

  async getGamesBySearch(page, game) {
    return await this.#axios.post(`/Game/${page}`, game);
  }

  async getUserById(userId) {
    return await this.#axios.get(`/User/${userId}`);
  }

  async getUserComments(page, userId) {
    return await this.#axios.get(`/Comment/${page}/${userId}`);
  }

  async getUserThemes(page, userId) {
    return await this.#axios.get(`/Theme/${page}/${userId}`);
  }

  async deleteTheme(themeId) {
    return await this.#axios.delete(`/Theme/${themeId}`);
  }

  async addNewComment(comment) {
    return await this.#axios.post(`/Comment`, comment);
  }

  async getGameById(theme) {
    return await this.#axios.post(`/Game`, theme);
  }

  async getThemeById(themeId) {
    return await this.#axios.get(`/Theme/${themeId}`);
  }

  async findCommentPage(comment) {
    return await this.#axios.post(`/Comment/${comment.id}/${comment.themeId}`);
  }

  async getAllComments(page, themeId) {
    return await this.#axios.get(`/Comment/${page}/${themeId}/0`);
  }

  async refreshUserData(userId, field, userData) {
    return await this.#axios.put(`/User/${userId}/${field}/${userData}`);
  }

  async refreshUserPicture(userId, user) {
    return await this.#axios.put(`/User/${userId}`, user);
  }

  async getCommentsByUserId(page, userId) {
    return await this.#axios.get(`/Comment/${page}/${userId}/1`);
  }

  async getFilteredGames(page, genre, platform, rating) {
    let gameFilter = {
      platform: platform,
      genre: genre,
    };

    console.log(gameFilter);
    return await this.#axios.put(`/Game/${page}/${rating}`, gameFilter);
  }

  async getThemes(gameId, page, userId) {
    return await this.#axios.get(`/Theme/${page}/${gameId}/${userId}`);
  }

  async addTheme(theme) {
    return await this.#axios.post(`/Theme`, theme);
  }

  async getGenres() {
    return await this.#axios.get(`/Genre`);
  }

  async getPlatforms() {
    return await this.#axios.get(`/Platform`);
  }

  async getUser(inputUser) {
    return await this.#axios.get(
      `/User/${inputUser.login}/${inputUser.password}`
    );
  }

  async getUserById(userId) {
    return await this.#axios.get(`/User/${userId}`);
  }

  async addNewUser(inputUser) {
    return await this.#axios.post("/User", inputUser);
  }
}

export default GameChatApiWorker;
