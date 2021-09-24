import './Hero.css';
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";

function Hero(props) {
  return (
    <div className="hero">
      <Header />
      <Promo />
      <NavTab />
    </div>
  )
}

export default Hero;