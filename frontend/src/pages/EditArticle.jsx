import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { articleAPI } from "../services/api";
import ArticleForm from "../components/ArticleForm";

const EditArticle = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get article from navigation state or fetch by ID
    if (location.state?.article) {
      setArticle(location.state.article);
    } else {
      // If no article in state, redirect back
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (articleData) => {
    try {
      setLoading(true);
      setError(null);

      await articleAPI.updateArticle(article.id, articleData);

      // Redirect to All Posts page
      navigate("/", {
        state: {
          message: `Article "${articleData.title}" has been updated successfully!`,
        },
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update article");
      console.error("Error updating article:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!article) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Edit Article</h1>
          <p className="mt-2 text-sm text-gray-700">
            Update your article. Make changes and choose to publish or save as
            draft.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <ArticleForm
          article={article}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditArticle;
