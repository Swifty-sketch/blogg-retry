import { Link } from "react-router-dom"

import { useContext } from "react";
import { UserContext } from "./UserContext";

const Navbar = () => {

  const { userName } = useContext(UserContext); 
  return (
    <ul className = "navbar">
      <li id = "Name"><h1>Blogg.se</h1></li>
      <li><p className = "navClick">Logged in: {userName}</p></li>
      <li><Link className = "navClick" to="/MakeBlogg">+</Link></li>
      <li><Link className = "navClick" to="/Explore">Explore</Link></li>
      <li><Link className = "navClick" to="/">Home</Link></li>
    </ul>  
  )
}

export default Navbar
