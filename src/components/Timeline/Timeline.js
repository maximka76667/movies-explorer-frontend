import './Timeline.css'

function Timeline(props) {
  return (
    <div className="timeline">
      <div className="timeline__block timeline__block_type_backend">
        <p className="timeline__time">1 неделя</p>
      </div>
      <div className="timeline__block timeline__block_type_frontend">
        <p className="timeline__time">4 недели</p>
      </div>
      <div className="timeline__block">
        <p className="timeline__part-name">Back-End</p>
      </div>
      <div className="timeline__block">
        <p className="timeline__part-name">Front-End</p>
      </div>
    </div>
  )
}

export default Timeline;