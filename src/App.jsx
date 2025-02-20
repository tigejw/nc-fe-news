import "./index.css";
import Header from "./componants/Header";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Article from "./componants/Article";
import Login from "./componants/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
