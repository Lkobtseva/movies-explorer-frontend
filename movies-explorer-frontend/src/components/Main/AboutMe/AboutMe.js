import React from "react";

function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="aboutMe__header">Студент</h2>
      <div className="aboutMe__container">
        <div className="aboutMe__block">
          <h3 className="aboutMe__name">Елизавета</h3>
          <p className="aboutMe__job">Фронтенд-разработчик, 19 лет</p>
          <p className="aboutMe__story">
            Я живу в Москве и учусь на 2 курсе в РЭУ им.Г.В. Плеханова на
            специальности "Бизнес-информатика". Очень нравится сфера, которую
            выбрала. Люблю учиться, путешествовать и слушать музыку, пока пишу
            проекты.{" "}
          </p>
          <a
            className="aboutMe__link"
            href="https://github.com/Lkobtseva"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="aboutMe__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;
