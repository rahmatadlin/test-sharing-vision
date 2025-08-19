import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { articleAPI } from "../services/api";

const Preview = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    fetchPublishedArticles();
  }, [currentPage]);

  const fetchPublishedArticles = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * articlesPerPage;
      const response = await articleAPI.getPublishedArticles(
        articlesPerPage,
        offset
      );

      // Filter only published articles
      const publishedArticles = response.data.filter(
        (article) => article.status === "publish"
      );
      setArticles(publishedArticles);

      // Calculate total pages (assuming we get all articles for now)
      const allArticlesResponse = await articleAPI.getPublishedArticles(
        1000,
        0
      );
      const allPublished = allArticlesResponse.data.filter(
        (article) => article.status === "publish"
      );
      setTotalPages(Math.ceil(allPublished.length / articlesPerPage));
    } catch (err) {
      setError("Failed to fetch articles");
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchPublishedArticles}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Blog Preview</h1>
          <p className="mt-2 text-lg text-gray-700">
            Published articles from your blog
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No published articles found.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                  <time className="text-sm text-gray-500">
                    {formatDate(article.created_date)}
                  </time>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h2>

                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <p>{truncateContent(article.content)}</p>
                </div>

                <div className="mt-6">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read more →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages >= 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span>{" "}
                of <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
