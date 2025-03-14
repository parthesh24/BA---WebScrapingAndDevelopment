import axios from 'axios';

const API_URL = 'http://localhost:5000/';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchArticles = async () => {
  try {
    const { data } = await api.get('/news');
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticlesByCategory = async (category) => {
  try {
    const { data } = await api.get(`/${category}`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} articles:`, error);
    throw error;
  }
};

export const fetchArticleById = async (id, category) => {
  try {
    console.log("here ",category)
    const { data } = await api.get(`/article/${id}?category=${category}`);
    return data;
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    throw error;
  }
};