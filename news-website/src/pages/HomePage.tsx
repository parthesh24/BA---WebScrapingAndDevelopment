import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import FeaturedArticle from "../components/FeaturedArticle";
import ArticleGrid from "../components/ArticleGrid";
import { fetchArticles } from "../api/index";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [articlesWithImages, setArticlesWithImages] = useState([]);
  const [articlesWithoutImages, setArticlesWithoutImage] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();

        if (!Array.isArray(data)) {
          throw new Error("Failed to load articles");
        }

        const a = data.filter(
          (article) =>
            article.imageUrl && 
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
        console.log("Failed to load articles", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  const featuredArticle = articlesWithImages[0];
  const remainingArticles = articlesWithImages.slice(1);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* ✅ Featured Article */}
      {featuredArticle && (
        <div className="mb-12">
          <FeaturedArticle article={featuredArticle} category={"news"} />
        </div>
      )}

      {/* ✅ Page Grid Layout (Conditional for Sidebar) */}
        {/* ✅ Left Column (Takes 2/3 width if sidebar exists, full width otherwise) */}
        <div className={articlesWithoutImages.length > 0 ? "lg:col-span-2" : "lg:col-span-3"}>
          {/* ✅ Articles With Images */}
          {articlesWithImages.length > 1 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Latest News</h2>
              <ArticleGrid articlesWithImages={remainingArticles} articlesWithoutImages={articlesWithoutImages} category={"news"}/>
            </div>
          )}

        
      </div>
    </main>
  );
};

export default HomePage;
