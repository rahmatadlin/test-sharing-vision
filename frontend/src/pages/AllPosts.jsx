import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { articleAPI } from "../services/api";
import TabNavigation from "../components/TabNavigation";
import ArticleTable from "../components/ArticleTable";

const AllPosts = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("published");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, activeTab]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articleAPI.getArticles(100, 0); // Get all articles
      setArticles(response.data);
    } catch (err) {
      setError("Failed to fetch articles");
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = [];

    switch (activeTab) {
      case "published":
        filtered = articles.filter((article) => article.status === "publish");
        break;
      case "draft":
        filtered = articles.filter((article) => article.status === "draft");
        break;
      case "thrash":
        filtered = articles.filter((article) => article.status === "thrash");
        break;
      default:
        filtered = articles;
    }

    setFilteredArticles(filtered);
  };

  const handleEdit = (article) => {
    navigate("/edit", { state: { article } });
  };

  const handleDelete = async (articleId) => {
    if (
      window.confirm("Are you sure you want to move this article to trash?")
    ) {
      try {
        // Update article status to thrash instead of deleting
        const article = articles.find((a) => a.id === articleId);
        if (article) {
          await articleAPI.updateArticle(articleId, {
            ...article,
            status: "thrash",
          });
          // Refresh articles
          fetchArticles();
        }
      } catch (err) {
        setError("Failed to move article to trash");
        console.error("Error moving article to trash:", err);
      }
    }
  };

  const getTabCounts = () => {
    return {
      published: articles.filter((a) => a.status === "publish").length,
      draft: articles.filter((a) => a.status === "draft").length,
      thrash: articles.filter((a) => a.status === "thrash").length,
    };
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchArticles}
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
          <h1 className="text-xl font-semibold text-gray-900">All Posts</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your articles. View, edit, and organize your content.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={getTabCounts()}
        />

        <div className="mt-6">
          <ArticleTable
            articles={filteredArticles}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
