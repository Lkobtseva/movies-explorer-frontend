import React from "react";

function Promo() {
  const handleButtonClick = () => {
    const aboutProjectElement = document.getElementById("aboutProject");
    aboutProjectElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="promo">
      <div className="promo__block">
        <h1 className="promo__header">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__text">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="promo__button" onClick={handleButtonClick}>
          Узнать больше
        </button>
      </div>
      <div className="promo__image" />
    </section>
  );
}

export default Promo;
