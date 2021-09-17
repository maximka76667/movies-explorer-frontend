import './Main.css';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Portfolio from '../Portfolio/Portfolio';
import Techs from '../Techs/Techs';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer';

function Main(props) {
  return (
    <>
      <Hero />
      <main className="main">
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}

export default Main;