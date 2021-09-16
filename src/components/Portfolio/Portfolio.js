import './Portfolio.css'

function Portfolio(props) {
  return (
    <div className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="works">
        <li className="works__item">
          <a className="work" href="#/">
            <p className="work__name">Статичный сайт</p>
            <p className="work__arrow">↗</p>
          </a>
        </li>
        <li className="works__item">
          <a className="work" href="#/">
            <p className="work__name">Адаптивный сайт</p>
            <p className="work__arrow">↗</p>
          </a>
        </li>
        <li className="works__item">
          <a className="work" href="https://max76667.mesto.nomoredomains.monster">
            <p className="work__name">Одностраничное приложение</p>
            <p className="work__arrow">↗</p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;