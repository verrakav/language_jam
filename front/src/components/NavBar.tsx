import {Link} from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul className="m-4 p-4 flex flex-row space-x-6">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dictionary">Dictionary</Link>
        </li>
        <li>
          <Link to="/study">Study</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}
