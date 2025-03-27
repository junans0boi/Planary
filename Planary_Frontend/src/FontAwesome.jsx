// src/FontAwesome.jsx
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 사용할 아이콘을 한 번에 등록
import {
    faHouse,
    faCalendar,
    faList,
    faBook,
    faUser,
    faEllipsisH,
    faPaperPlane,
    faMagnifyingGlass,
    faChevronLeft,
    faUserPlus,
    faCommentMedical,
    faPencil
} from "@fortawesome/free-solid-svg-icons";

// 아이콘 라이브러리에 추가
library.add(
    // <FontAwesomeIcon icon="house" />
    faHouse,
    // <FontAwesomeIcon icon="calendar" />
    faCalendar,
    // <FontAwesomeIcon icon="list" />
    faList,
    // <FontAwesomeIcon icon="book" />
    faBook,
    // <FontAwesomeIcon icon="user" />
    faUser,
    // <FontAwesomeIcon icon="ellipsis-h" />
    faEllipsisH,
    // <FontAwesomeIcon icon="paper-plane" />
    faPaperPlane,
    // <FontAwesomeIcon icon="magnifying-glass" />
    faMagnifyingGlass,
    // <FontAwesomeIcon icon="chevron-left" />
    faChevronLeft,
    // <FontAwesomeIcon icon="user-plus" />
    faUserPlus,
    // <FontAwesomeIcon icon="comment-medical" />
    faCommentMedical,
    // <FontAwesomeIcon icon="pencil" />
    faPencil
);













export { FontAwesomeIcon };