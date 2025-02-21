import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
export default function Filters() {
  let url = window.location.href;
  function checkOrderExists(url) {
    return url.includes("&order=");
  }

  function removeOrder(url) {
    return url.split("&")[0];
  }

  return (
    <div className="filters">
      <div>
        <DropdownButton title="sort by" className="sort-by">
          <Dropdown.Item href="?sort_by=created_at">Date</Dropdown.Item>
          <br></br>
          <Dropdown.Item href="/?sort_by=comment_count">Comments</Dropdown.Item>
          <br></br>
          <Dropdown.Item href="/?sort_by=votes">Votes</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="order">
        <DropdownButton title="order">
          <Dropdown.Item
            href={
              checkOrderExists(url)
                ? removeOrder(url) + "&order=desc"
                : url + "&order=desc"
            }
          >
            Desc
          </Dropdown.Item>
          <br></br>
          <Dropdown.Item
            href={
              checkOrderExists(url)
                ? removeOrder(url) + "&order=asc"
                : url + "&order=asc"
            }
          >
            Asc
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}
