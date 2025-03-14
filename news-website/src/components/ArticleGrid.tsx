import { useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const ArticleGrid = ({ articlesWithImages, articlesWithoutImages, category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 14;

  // Paginate articles with images
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = articlesWithImages.slice(startIndex, endIndex);
  const totalPages = Math.ceil(articlesWithImages.length / articlesPerPage);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className={`grid grid-cols-1 ${articlesWithoutImages.length > 0 ? "lg:grid-cols-3" : "lg:grid-cols-1"} gap-8`}>
      {/* ✅ Left Column (Paginated Articles With Images) */}
      <div className={articlesWithoutImages.length > 0 ? "lg:col-span-2" : "lg:col-span-3"}>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${articlesWithoutImages.length === 0 ? 'lg:grid-cols-3' : ''} gap-6`}>
          {paginatedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} category={category} />
          ))}
        </div>

        {/* Pagination Controls */}
        {articlesWithImages.length > articlesPerPage && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ✅ Right Column (Sidebar - Articles Without Images) */}
      {articlesWithoutImages.length > 0 && (
        <aside className="lg:col-span-1 border-l border-gray-300 dark:border-gray-700 pl-6">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              More News
            </h2>
            <div className="space-y-4">
              {articlesWithoutImages.slice(0, 16).map((article) => (
                <div
                  key={article.id}
                  className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md"
                >
                  <Link to={article.url}>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {article.description || "No description available"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default ArticleGrid;