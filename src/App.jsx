import "./index.css";
import Header from "./componants/Header";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Article from "./componants/Article";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
