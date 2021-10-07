import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import React from 'react';

function Header(props) {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header ${props.loggedIn ? "header_logged-in" : ''}`}>
      <Logo />
      <Navigation loggedIn={props.loggedIn} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header;