import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleGrid from '../components/ArticleGrid';
import { fetchArticlesByCategory } from '../api/index';
import LoadingSpinner from '../components/LoadingSpinner';

const CategoryPage = () => {
  const { category } = useParams();
  // const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [articlesWithImages, setArticlesWithImages] = useState([]);
  const [articlesWithoutImages, setArticlesWithoutImage] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticlesByCategory(category);
        if (!Array.isArray(data)) {
          throw new Error("Failed to load articles");
        }

        const a = data.filter(
          (article) => article.imageUrl && 
            article.imageUrl !== "No image available" &&
            article.author && 
            article.author !== "Unknown Author"
        );
        const b = data.filter(
          (article) => !article.imageUrl || article.imageUrl === "No image available"
        );

        setArticlesWithImages(a);
        setArticlesWithoutImage(b);
      } catch (err) {
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [category]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <ArticleGrid
        articlesWithImages={articlesWithImages}
        articlesWithoutImages={articlesWithoutImages}
        category={category}
      />

    </main>
  );
};

export default CategoryPage;