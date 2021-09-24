import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import React from 'react';

function Header(props) {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // const [isMenuAllowed, setIsMenuAllowed] = React.useState(false);

  // function checkResize() {
  //   if (window.innerWidth < 800) return setIsMenuAllowed(true);
  //   setIsMenuAllowed(false);
  //   setIsMenuOpen(false);
  //   return
  // }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // React.useEffect(() => {
  //   console.log('resize');
  //   checkResize();
  // }, [window.innerWidth])

  // React.useEffect(() => {
  //   window.addEventListener("resize", checkResize);
  //   checkResize();
  // }, [])

  return (
    <header className="header">
      <Logo />
      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header;