import { FontAwesomeIcon } from "../../FontAwesome";  
import { useState } from "react";
import { Link } from "react-router-dom";

import "./BottomNav.css";


const BottomNav = () => {
    // 선택된 아이콘을 관리하는 state
    const [activeNav, setActiveNav] = useState(1);

    return (
        <nav className="wrapper">
            <div>
                <Link to="/" className="nav-link" onClick={() => setActiveNav(1)}>
                    <FontAwesomeIcon
                                icon="house"
                                className={activeNav === 1 ? "nav-item active" : "nav-item"}
                              />
                </Link>
            </div>
            <div>
                <Link to="/todolist" className="nav-link" onClick={() => setActiveNav(2)}>
                    <FontAwesomeIcon icon="list" className={activeNav === 2 ? "nav-item active" : "nav-item"} />
                </Link>
            </div>
            <div>
                <Link to="/diary" className="nav-link" onClick={() => setActiveNav(3)}>
                    <FontAwesomeIcon icon="book" className={activeNav === 3 ? "nav-item active" : "nav-item"} />
                </Link>
            </div>
            <div>
                <Link to="/profile" className="nav-link" onClick={() => setActiveNav(4)}>
                    <FontAwesomeIcon icon="user" className={activeNav === 4 ? "nav-item active" : "nav-item"} />
                </Link>
            </div>
        </nav>
    );
};

export default BottomNav;