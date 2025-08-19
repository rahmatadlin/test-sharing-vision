import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { articleAPI } from "../services/api";
import ArticleForm from "../components/ArticleForm";

const AddNew = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (articleData) => {
    try {
      setLoading(true);
      setError(null);

      await articleAPI.createArticle(articleData);

      // Redirect to All Posts page
      navigate("/", {
        state: {
          message: `Article "${articleData.title}" has been ${
            articleData.status === "publish" ? "published" : "saved as draft"
          } successfully!`,
        },
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create article");
      console.error("Error creating article:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Add New Article
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Create a new article. Fill in the details below and choose to
            publish or save as draft.
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
        <ArticleForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddNew;
