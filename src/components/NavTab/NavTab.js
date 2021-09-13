import { HashLink as Link } from 'react-router-hash-link';

function NavTab(props) {
  return (
    <div className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <Link className="nav-tab__link" to="/#about">О проекте</Link>
        </li>
        <li className="nav-tab__item">
          <Link className="nav-tab__link" to="/#techs">Технологии</Link>
        </li>
        <li className="nav-tab__item">
          <Link className="nav-tab__link" to="/#portfolio">Студент</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavTab;