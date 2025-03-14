import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchArticles } from '../api/index';
import { formatDate } from '../utils/index';
import LoadingSpinner from '../components/LoadingSpinner';

const ArticlePage = () => {
  const { id, category } = useParams();
  const [article, setArticle] = useState(null);
  const [moreArticles, setMoreArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await fetchArticleById(id,category);
        console.log("fetched article", data)
        setArticle(data);
        
        // Fetch related articles
        const more = await fetchArticles();
        
        if (!Array.isArray(more)) {
          throw new Error("Failed to load articles");
        }

        const a = more.filter(
          (article) =>
            article.id !== id && 
            article.imageUrl && 
            article.imageUrl !== "No image available" &&
            article.author && 
            article.author !== "Unknown Author"
        );
        setMoreArticles(a);
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!article) return <div className="text-center mt-8">Article not found</div>;

  // Split content into paragraphs
  const paragraphs = article.content.split('\n').filter(p => p.trim() !== '');

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
          <p>By {article.author}</p>
          <span>•</span>
          <time dateTime={article.timestamp}>
            {formatDate(article.timestamp)}
          </time>
        </div>

        {article.imageUrl && (
          <img
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Originally published at{" "}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              source
            </a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: {formatDate(article.timestamp)}
          </p>
        </div>

        {/* More Articles Section */}
        {moreArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              More Articles
            </h2>
            <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
              {moreArticles.map((article) => (
                <div 
                  key={article.id}
                  className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
                      {article.description}
                    </p>
                    <a
                      href={`/article/${article.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
};

export default ArticlePage;