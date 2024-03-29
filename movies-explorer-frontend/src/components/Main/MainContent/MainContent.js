import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";


function MainContent(props) {
    const { navigate } = props; 
  return (
      <main className="content">
        <Promo/>
        <div id="aboutProject"> 
          <AboutProject />
        </div>
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
  );
}

export default MainContent;