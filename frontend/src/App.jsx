import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AllPosts from "./pages/AllPosts";
import AddNew from "./pages/AddNew";
import EditArticle from "./pages/EditArticle";
import Preview from "./pages/Preview";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/add" element={<AddNew />} />
          <Route path="/edit" element={<EditArticle />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
