import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <div className="portfolio__links">
        <a
          className="portfolio__link"
          href="https://github.com/Lkobtseva"
          target="_blank"
          rel="noreferrer"
        >
          <p className="link__text">Статичный сайт</p>
          <div className="link__icon"></div>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/Lkobtseva/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          <p className="link__text">Адаптивный сайт</p>
          <div className="link__icon"></div>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/Lkobtseva/react-mesto-api-full-gha"
          target="_blank"
          rel="noreferrer"
        >
          <p className="link__text">Одностраничное приложение</p>
          <div className="link__icon"></div>
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
