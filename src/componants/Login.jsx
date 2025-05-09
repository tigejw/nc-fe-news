import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UsernameContext } from "../contexts/Username";
import { useNavigate } from "react-router";
export default function Login() {
  const { setUsername } = useContext(UsernameContext);
  const [users, setUsers] = useState([]);
  const [tempUsernameInput, setTempUsernameInput] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    axios
      .get("https://nc-news-ctm3.onrender.com/api/users")
      .then(({ data: { users } }) => {
        setUsers(users);
      })
      .catch((err) => {
        setError(err);
      });
  });
  function handleErrorNav(error) {
    nav("/error", { state: error.message });
  }

  function checkUsernameExists(inputtedUsername) {
    return users.some((user) => {
      return user.username === inputtedUsername;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (checkUsernameExists(tempUsernameInput.trim())) {
      setUsername(tempUsernameInput.trim());
      nav(-1);
    } else setInvalidUsername(true);
  }

  if (error) {
    handleErrorNav(error);
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="usernameInput">Username:⠀ </label>
          <input
            className="login-bar"
            id="usernameInput"
            type="text"
            value={tempUsernameInput}
            onChange={(e) => {
              setTempUsernameInput(e.target.value);
            }}
          ></input>
          <button type="submit" className="login-submit">
            Submit!
          </button>
        </form>
        <br></br>
        <p>Guest username is: "jessjelly" ! :)</p>
        <div className="error">
          {invalidUsername ? <p>Username must exist!</p> : null}
        </div>
      </>
    );
  }
}
