import React, { useState } from "react";

import { NavbarItems } from "../../Constants/Item";
import "./Navbar.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Navbar(props) {
    const [clicked, setClicked] = useState(false);
    const history = useHistory();
    const handleClick = () => {
        setClicked(!clicked);
    };
    const handleLogOut = () => {
        localStorage.clear();
        history.push("/");
    };
    return (
        <nav className="NavbarItem">
            <h1 className="navbar-logo">
                Trello<i className="fab fa-trello"></i>
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
            <Button>
                <Link to={"/sign-up"}>Sign Up</Link>
            </Button>
            <Button onClick={() => handleLogOut()}>Log Out</Button>
        </nav>
    );
}

export default Navbar;
