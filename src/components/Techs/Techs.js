function Techs(props) {
  return (
    <div id="techs" className="techs">
      <h2 className="techs__heading">Технологии</h2>
      <div className="techs__content">
        <h3 className="techs__subheading">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="tech"><p className="tech__title">HTML</p></li>
          <li className="tech"><p className="tech__title">CSS</p></li>
          <li className="tech"><p className="tech__title">JS</p></li>
          <li className="tech"><p className="tech__title">React</p></li>
          <li className="tech"><p className="tech__title">Git</p></li>
          <li className="tech"><p className="tech__title">Express.js</p></li>
          <li className="tech"><p className="tech__title">mongoDB</p></li>
        </ul>
      </div>
    </div>
  )
}

export default Techs;