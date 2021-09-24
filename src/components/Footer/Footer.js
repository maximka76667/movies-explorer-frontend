import './Footer.css';

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__author">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className="footer__line" />
      <div className="footer__content">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.ru/profile/web/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__item"><a className="footer__link" href="https://github.com/maximka76667" target="_blank" rel="noreferrer">Github</a></li>
          <li className="footer__item"><a className="footer__link" href="https://www.facebook.com/profile.php?id=100057730898201" target="_blank" rel="noreferrer">Facebook</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;