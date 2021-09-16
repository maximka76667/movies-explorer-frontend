import './AboutMe.css'

function AboutMe(props) {
  return (
    <div id="about-me" className="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <hr className="about-me__line" />
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Максим</h3>
          <h4 className="about-me__short">Фронтенд-разработчик, 17 лет</h4>
          <p className="about-me__story">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной
            работы.
          </p>
          <ul className="about-me__links">
            <li className="about-me__item"><a className="about-me__link" href="https://www.facebook.com/profile.php?id=100057730898201" target="_blank" rel="noreferrer">Facebook</a></li>
            <li className="about-me__item"><a className="about-me__link" href="https://github.com/maximka76667" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
        <img className="about-me__photo" alt="Фото портфолио" />
      </div>
    </div>
  )
}

export default AboutMe;