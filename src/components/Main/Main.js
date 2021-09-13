import Header from '../Header/Header'
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';

function Main(props) {
  return (
    <main className="main">
      <div className="hero">
        <Header />
        <Promo />
        <NavTab />
      </div>
    </main>
  )
}

export default Main;