import './AboutMe.css'
import aboutMePhoto from '../../images/about-me-photo.jpg'

function AboutMe(props) {
  return (
    <div id="about-me" className="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <hr className="about-me__line" />
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Максим</h3>
          <h4 className="about-me__short">Фронтенд-разработчик, 18 лет</h4>
          <p className="about-me__story">Я родился в Астане, сейчас живу в Сантьяго-Де-Компостела. Учусь в колледже разработки приложений.
            Я люблю слушать музыку, а ещё увлекаюсь видеиграми. В этом году начал кодить.
          </p>
          <ul className="about-me__links">
            <li className="about-me__item"><a className="about-me__link" href="https://www.facebook.com/profile.php?id=100057730898201" target="_blank" rel="noreferrer">Facebook</a></li>
            <li className="about-me__item"><a className="about-me__link" href="https://github.com/maximka76667" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
        <img className="about-me__photo" src={aboutMePhoto} alt="Фото портфолио" />
      </div>
    </div>
  )
}

export default AboutMe;