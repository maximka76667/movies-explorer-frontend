import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img className="logo__img" src={logo} alt="Лого" />
      </Link>
      <Navigation />
    </header>
  )
}

export default Header;