import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function CartMenu() {
    return (
      <li><Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/></Link></li>
    )
}