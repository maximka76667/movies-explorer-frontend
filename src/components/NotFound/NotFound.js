import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound(props) {
  return (
    <div className="not-found">
      <h1 className="not-found__error-code">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" to="/">Назад</Link>
    </div>
  )
}

export default NotFound;