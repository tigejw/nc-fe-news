import { useContext } from "react";
import { UsernameContext } from "../contexts/Username";
import { Link } from "react-router";
export default function Header() {
  const { username } = useContext(UsernameContext);
  return (
    <>
      <header>
        <h3>@nc_news</h3>
        <nav className="navbar">
          {username ? (
            <p>logged in as {username} </p>
          ) : (
            <Link to="/login">Login!</Link>
          )}
          <br></br>
          <Link to="/topics">Topics!</Link>
        </nav>
      </header>
    </>
  );
}
