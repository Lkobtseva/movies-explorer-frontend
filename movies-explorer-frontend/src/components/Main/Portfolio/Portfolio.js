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
          <p className="portfolio__link--text">Статичный сайт</p>
          <div className="portfolio__link--icon"></div>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/Lkobtseva/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__link--text">Адаптивный сайт</p>
          <div className="portfolio__link--icon"></div>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/Lkobtseva/react-mesto-api-full-gha"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__link--text">Одностраничное приложение</p>
          <div className="portfolio__link--icon"></div>
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
