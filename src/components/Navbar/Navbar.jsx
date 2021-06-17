import React, { useState } from "react";

import { NavbarItems } from "../../Constants/Item";
import "./Navbar.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

function Navbar(props) {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    };
    return (
        <nav className="NavbarItem">
            <h1 className="navbar-logo">
                Reactjs<i className="fab fa-react"></i>
            </h1>
            <div className="menu-icon" onClick={handleClick}>
                <li className={clicked ? "fas fa-times" : "fas fa-bars"}></li>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {NavbarItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={item.url} className={item.cName}>
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Button> Sign Up</Button>
        </nav>
    );
}

export default Navbar;
