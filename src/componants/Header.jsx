import { useContext } from "react";
import { UsernameContext } from "../contexts/Username";
import Navigationbar from "./Navigationbar";
export default function Header() {
  const { username } = useContext(UsernameContext);
  return (
    <>
      <header>
        <Navigationbar />
      </header>
    </>
  );
}
