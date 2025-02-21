import { useLocation } from "react-router-dom";
export default function Error() {
  const location = useLocation();
  const errMsg = location.state;
  return (
    <div>
      <p>Uh oh! Error: {errMsg}</p>
    </div>
  );
}
