import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container footer__container_between footer__container_column-reverse">
        <p className="footer__text footer__text_mobile">
          &copy;&nbsp;{new Date().getFullYear()}
        </p>
        <div className="footer__text-container footer__text-container_end">
          <a
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
            className="footer__text"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="footer__text"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
