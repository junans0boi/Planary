import React from "react";
import "./BottomNav.css";
import "./FontAwesome";
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const BottomNav = () =>{
    return(
        <nav className="wrapper">
            <div>
                <FontAwesomeIcon icon="home" />
            </div>
            <div>
                <FontAwesomeIcon icon="calendar" />
            </div>
            <div>
                <FontAwesomeIcon icon="list" />
                
            </div>
            <div>
                <FontAwesomeIcon icon="book" />
            </div>
            <div>
                <FontAwesomeIcon icon="ellipsis" />
            </div>
        </nav>
    );
};
export default BottomNav;
