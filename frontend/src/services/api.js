import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Article API endpoints
export const articleAPI = {
  // Get all articles with pagination
  getArticles: (limit = 10, offset = 0) =>
    api.get(`/article/list/${limit}/${offset}`),

  // Get article by ID
  getArticle: (id) => api.get(`/article/${id}`),

  // Create new article
  createArticle: (articleData) => api.post("/article/", articleData),

  // Update article
  updateArticle: (id, articleData) => api.put(`/article/${id}`, articleData),

  // Delete article
  deleteArticle: (id) => api.delete(`/article/${id}`),

  // Get published articles for preview
  getPublishedArticles: (limit = 10, offset = 0) =>
    api.get(`/article/list/${limit}/${offset}`),
};

// Health check
export const healthAPI = {
  checkHealth: () => api.get("/health"),
  getAPIInfo: () => api.get("/"),
};

export default api;
