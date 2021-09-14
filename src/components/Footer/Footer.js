function Footer(props) {
  return (
    <div className="footer">
      <p className="footer__author">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright"></p>
        <ul className="footer__links">
          <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.ru/profile/web/">Яндекс.Практикум</a></li>
          <li className="footer__item"><a className="footer__link" href="https://github.com/maximka76667">Github</a></li>
          <li className="footer__item"><a className="footer__link" href="https://www.facebook.com/profile.php?id=100057730898201">Facebook</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;