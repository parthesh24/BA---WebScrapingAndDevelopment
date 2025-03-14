import { Link } from 'react-router-dom';
import { formatDate } from '../utils/index';

const ArticleCard = ({ article, category }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {article.imageUrl && (
        <img
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        {/* {category==="arts" && (
            <Link to={article.url}>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              {article.title}
            </h3>
          </Link>  
        )} */}
        {/* {category!=="arts" && ( */}
        <Link to={`/article/${article.id}/${category}`}>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            {article.title}
          </h3>
        </Link>
        {/* )} */}
        
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
          {article.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <span>{article.author}</span>
          <span>•</span>
          <time dateTime={article.timestamp}>
            {formatDate(article.timestamp)}
          </time>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;