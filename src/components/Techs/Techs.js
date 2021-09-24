import './Techs.css'

function Techs(props) {
  return (
    <div id="techs" className="techs">
      <h2 className="techs__heading">Технологии</h2>
      <hr className="techs__line" />
      <div className="techs__content">
        <h3 className="techs__subheading">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__item"><div className="tech"><p className="tech__title">HTML</p></div></li>
          <li className="techs__item"><div className="tech"><p className="tech__title">CSS</p></div></li>
          <li className="techs__item"><div className="tech"><p className="tech__title">JS</p></div></li>
          <li className="techs__item"><div className="tech"><p className="tech__title">React</p></div></li>
          <li className="techs__item"><div className="tech"><p className="tech__title">Git</p></div></li>
          <li className="techs__item"><div className="tech"><p className="tech__title">Express.js</p></div></li>
          <li className="techs__item"><div className="tech"><p className="tech__title">mongoDB</p></div></li>
        </ul>
      </div>
    </div>
  )
}

export default Techs;