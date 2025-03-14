import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { fetchArticles, fetchArticlesByCategory } from "../api";

const categories = [
  { name: "Home", path: "/" },
  { name: "Arts", path: "/arts" },
  { name: "Culture", path: "/culture" },
  { name: "Business", path: "/business" },
  { name: "Travel", path: "/travel" },
  { name: "Earth", path: "/future-planet" },
  { name: "Innovation", path: "/innovation" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const params = useParams(); // Extract category from URL params

  const location = useLocation();

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle("dark", newMode)
  }

  // Filter articles based on search query
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        // Fetch articles based on the current category
        const articles = params.category
          ? await fetchArticlesByCategory(params.category)
          : await fetchArticles();
        
          const b = articles.filter(
            (article) =>  article.author && article.author !== "Unknown Author"
          );
  
        const filtered = b.filter((article) =>
          article.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredArticles(filtered);
        setIsSearchOpen(true);
        console.log("is search open", isSearchOpen);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setFilteredArticles([]);
        setIsSearchOpen(false);
      }
    } else {
      setFilteredArticles([]);
      setIsSearchOpen(false);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">
              The Daily Bugle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`text-lg font-medium transition-colors duration-200 ${
                  location.pathname === category.path
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative search-container">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none w-48 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button type="button" className="text-gray-500 dark:text-gray-400">
                <Search size={20} />
              </button>
            </div>

            {/* Search Results */}
            {isSearchOpen && filteredArticles.length > 0 && (
              <div className="absolute top-12 left-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}/${params.category}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 shadow-lg">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="block px-6 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;