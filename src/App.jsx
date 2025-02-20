import "./index.css";
import Header from "./componants/Header";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Article from "./componants/Article";
import Login from "./componants/Login";
import Topics from "./componants/Topics";
import Topic from "./componants/Topic";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="topics/:topic_slug" element={<Topic />} />
      </Routes>
    </>
  );
}

export default App;
