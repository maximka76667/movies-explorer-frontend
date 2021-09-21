import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

function Header(props) {
  return (
    <header className="header">
      <Logo />
      <Navigation />
    </header>
  )
}

export default Header;