import { Link } from "react-router-dom"


const ArticleWithoutImage = (articlesWithoutImages) => {
  return (
    <div>
      {/* ✅ Right Column (Sidebar - Articles Without Images) */}
      {articlesWithoutImages.length > 0 && (
        <aside className="lg:col-span-1 border-l border-gray-300 dark:border-gray-700 pl-6">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              More News
            </h2>
            <div className="space-y-4">
              {articlesWithoutImages.map((article) => (
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
  )
}

export default ArticleWithoutImage