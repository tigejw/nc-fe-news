import { useEffect } from "react";
import { useNavigate } from "react-router";
export default function Pathing() {
  const nav = useNavigate();
  useEffect(() => {
    nav("/home");
  });
  return <> </>;
}
