import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalType";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: 1 , padding: '10px 0'}}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="material-icons">favorite</span>
          </span>
        </li>

        <li className="nav-item dropdown" style={{ opacity: 1 ,padding: '10px 0'}}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth?.success ? auth?.success?.avatar : auth?.user?.avatar} size="medium-avatar"/>
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user?._id}`}>
              Profile
            </Link>

            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? "Light mode" : "Dark mode"}
            </label>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

// function Navbar(props) {
//   return (
//     <div className="menu">
//       <ul className="navbar-nav flex-row">{props.children}</ul>
//     </div>
//   );
// }

// function NavItem(props) {
//   const [open, setOpen] = useState(false);
//   return (
//     <li className="nav-item px-2">
//       <Link
//         to={props.link.path}
//         className='nav-link icon-button'
//         onClick={() => setOpen(!open)}
//       >
//         <span className="material-icons">{props.link.icon}</span>
//       </Link>

//       {open && props.children}
//     </li>
//   );
// }

// function DropdownMenu(props) {
//   const [activeMenu, setActiveMenu] = useState('main');
//   const [menuHeight, setMenuHeight] = useState(null);
//   const dropdownRef = useRef(null);
//   console.log({props})

//   useEffect(() => {
//     setMenuHeight(dropdownRef.current?.offsetHeight)
//   }, [])

//   function calcHeight(el) {
//     const height = el.offsetHeight + 30 +"px";
//     setMenuHeight(height);
//   }
//   function DropdownItem(props) {
//     return (
//       <Link
//         to={props.link.user._id}
//         className="menu-item"
//         onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
//       >
//         <span className="material-icons icon-button">{props.leftIcon}</span>
//         {props.children}
//         <span className="material-icons icon-right">{props.rightIcon}</span>
//       </Link>
//     );
//   }

//   return (
//     <div className="dropdown"  style={{ height: menuHeight }} ref={dropdownRef} onEnter={calcHeight}>
//       <CSSTransition
//         in={activeMenu === "main"}
//         timeout={500}
//         classNames="menu-primary"
//         unmountOnExit
//         onEnter={calcHeight}
//       >
//       <div className="menu">
//         <DropdownItem link={props?.link}>My Profile</DropdownItem>
//         <DropdownItem
//           leftIcon="settings"
//           rightIcon="keyboard_arrow_right"
//           goToMenu="settings"
//         >
//           Settings
//         </DropdownItem>
//         <DropdownItem
//             leftIcon="🦧"
//             rightIcon="keyboard_arrow_right"
//             goToMenu="animals">
//             Animals
//           </DropdownItem>

//       </div>
//       </CSSTransition>

//       <CSSTransition
//         in={activeMenu === 'settings'}
//         timeout={500}
//         classNames="menu-secondary"
//         unmountOnExit
//         onEnter={calcHeight}>
//         <div className="menu">
//           <DropdownItem goToMenu="main" leftIcon="west">
//             <h2>My Tutorial</h2>
//           </DropdownItem>
//           <DropdownItem leftIcon="exit_to_app">HTML</DropdownItem>
//           <DropdownItem leftIcon="exit_to_app">CSS</DropdownItem>
//           <DropdownItem leftIcon="exit_to_app">JavaScript</DropdownItem>
//           <DropdownItem leftIcon="exit_to_app">Awesome!</DropdownItem>
//         </div>
//       </CSSTransition>

//       <CSSTransition
//         in={activeMenu === 'animals'}
//         timeout={500}
//         classNames="menu-secondary"
//         unmountOnExit
//         onEnter={calcHeight}>
//         <div className="menu">
//           <DropdownItem goToMenu="main" leftIcon="exit_to_app">
//             <h2>Animals</h2>
//           </DropdownItem>
//           <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
//           <DropdownItem leftIcon="🐸">Frog</DropdownItem>
//           <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
//           <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
//         </div>
//       </CSSTransition>
//     </div>
//   );
// }

export default Menu;
