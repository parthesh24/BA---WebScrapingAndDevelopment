import { Link } from 'react-router-dom';
import { formatDate } from '../utils/index';

const FeaturedArticle = ({ article, category }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={article.imageUrl || "/placeholder.svg"}
        alt={article.title}
        className="w-full aspect-[21/9] object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <Link to={`/article/${article.id}/${category}`}>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 hover:text-blue-400 transition-colors">
            {article.title}
          </h2>
        </Link>
        
        <p className="text-white/90 mb-4 line-clamp-2 md:line-clamp-3 max-w-3xl">
          {article.description}
        </p>

        <div className="flex items-center gap-2 text-white/80">
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

export default FeaturedArticle;