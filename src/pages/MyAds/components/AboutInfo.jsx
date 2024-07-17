import React, { useMemo } from "react";

const AboutInfo = ({responce}) => {
  const counter = useMemo(() => {
    if (Number(responce.createNumber) === 1){
      return "Задание создано"
    } 
    else{
      if (Number(responce.createNumber) > 1 && Number(responce.createNumber) < 5){
        return "Задания создано"
      }
      else{
        return "Заданий создано"
      }
    }
// eslint-disable-next-line
  }, [])
  return (
    <div className="aboutInfo">
      <div className="name">
        <p>{responce.user.fl}</p>
      </div>

      <div onClick={() => {
        window.Telegram.WebApp.openTelegramLink("https://t.me/" + responce.user.link)
      }} className="userLink">
        <p className="telegramLink"> Открыть в Telegram </p>

        
      </div>
      <div className="aboutDown">
        <div className="block">
          <p>{responce.createNumber}</p>
          <p className="aboutInfo__text">{counter}</p>
          
        </div>
        <div className="block">
          <p>0</p>
          <p className="aboutInfo__text">Заданий выполено</p>
        </div>
      </div>

    </div>
  );
};

export default AboutInfo;
