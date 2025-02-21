import "./index.css";
import Home from "./componants/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Article from "./componants/Article";
import Login from "./componants/Login";
import Topics from "./componants/Topics";
import Topic from "./componants/Topic";
import Error from "./componants/Error";
import NavigationBar from "./componants/NavigationBar";
function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic_slug" element={<Topic />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="*"
          element={<Navigate to="/error" state="Invalid URL" />}
        />
      </Routes>
    </>
  );
}

export default App;
