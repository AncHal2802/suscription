// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import Login from './login';
import SearchBar from './SearchBar';
import Premium from './Premium';


const Navbar = ({ onSearch }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const logged = window.localStorage.getItem("userLogged")

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos === 0) {
      setVisible(true);
    } else if (prevScrollPos < currentScrollPos && visible) {
      setVisible(false);
    } else if (prevScrollPos > currentScrollPos && !visible) {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  const excludePaths = ['/', '/politics', '/buisness', '/sports', '/entertainment', '/login', '/register','/newsDetails','/premium'];

  return (
    <nav className={`NavbarItem ${visible ? '' : 'scrolled'}`}>
      <div className='menu-icons'>
        <i className='fa fa-bars'></i>
      </div>
      <div className='nav-logo-container'>
        <h1 className='navbar-logo'>The News Portal</h1>
      </div>

      {excludePaths.indexOf(location.pathname) === -1 && (
        <div className='search-icon-container'>
        </div>
      )}

      {excludePaths.indexOf(location.pathname) === -1 && <SearchBar onSearch={onSearch} />}

      <ul className='nav-menu'>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i> {item.title}
            </Link>
          </li>
        ))}
        {logged == "false" &&
          <li>
            <Link type='button' className='nav-mobile' to='/login'>
              Login
            </Link>
          </li>}
        {logged == "true" &&
          <li>
            <Link type='button' className='nav-mobile' to='/login' onClick={() => window.localStorage.setItem("userLogged", false)}>
              Logout
            </Link>
          </li>}
          <li>
 

</li>

      </ul>
    </nav>
  );
};

export default Navbar;
