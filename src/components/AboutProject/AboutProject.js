function AboutProject(props) {
  return (
    <div id="about-project" className="about-project">
      <h2 className="about-project__heading">О проекте</h2>
      <div className="about-project__content">
        <div className="about-project__info">
          <div className="about-project__card">
            <h3 className="about-project__subheading">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__card-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__card">
            <h3 className="about-project__subheading">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__card-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="timeline">
          <div className="timeline__backend-block">
            <p className="timeline__time">1 неделя</p>
          </div>
          <p className="timeline__part-name">Back-End</p>
          <div className="timeline__frontend-block">
            <p className="timeline__time">4 недели</p>
          </div>
          <p className="timeline__part-name">Front-End</p>
        </div>
      </div>
    </div>
  )
}

export default AboutProject;