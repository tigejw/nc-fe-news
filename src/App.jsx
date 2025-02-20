import "./index.css";
import Header from "./componants/Header";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Article from "./componants/Article";
import Pathing from "./componants/Pathing";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Pathing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
