import { useContext } from "react";
import { UsernameContext } from "../contexts/Username";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";
export default function NavigationBar() {
  const { username } = useContext(UsernameContext);

  return (
    <Navbar className="bootstrap-navbar" expand="false">
      <Container>
        <h3>@nc_news</h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {username ? (
              <a>Logged in as {username}</a>
            ) : (
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            )}
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/topics"
              style={{ color: "white", textDecoration: "none" }}
            >
              Topics
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
