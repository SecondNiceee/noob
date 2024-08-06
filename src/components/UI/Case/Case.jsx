import React, { memo } from "react";
import cl from "./Case.module.css";
import FalseTie from "../FalseTie/FalseTie";
import MyButton from "../MyButton/MyButton";

const Case = ({
  className,
  card,
  category,
  openFunc,
  task,
  title,
  description,
  photos,
  changeFunction,
  deleteFunction,
  watchOnly,
  agree = false,
  ...props
}) => {
  
  return (
    <div
      {...props}
      className={className ? [cl.case, className].join(" ") : cl.case}
    >
      {photos.length > 0 ? (
        <div className={cl.caseTop}>
          {photos.map((e, i) => {
            let url = URL.createObjectURL(e);
            return (
              <img
                key={i}
                style={photos.length === 1 ? { minWidth: "100%" } : {}}
                src={url}
                alt=""
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}

      <div className={cl.caseBottom}>
        <div className={cl.caseLeft}>
          <h4>{title}</h4>
          <p>Категория: Дизайн</p>
        </div>

        {watchOnly ? (
          <div
            style={{
              gap: "13px",
            }}
            className={cl.caseRight}
          >
            <div className={cl.one}>
              <div onClick={() => {
                                window.Telegram.WebApp.openTelegramLink(
                                  "https://t.me/share/url?text=&url=https://t.me/ConnectexBot/case?startapp=" + String(card.id) + "m" + 2144832745
                                );
              } } className={cl.circle}>
                
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.27412 14.1889C3.65286 9.80024 7.77571 7.3393 9.89984 7.09514C10.0827 7.07412 10.2305 6.92578 10.2305 6.74169V4.83951C10.2305 4.54329 10.588 4.39423 10.7985 4.60272L16.108 9.86313C16.2435 9.99739 16.239 10.2178 16.098 10.3463L10.7884 15.1859C10.5744 15.3809 10.2305 15.2291 10.2305 14.9395V12.5912C10.2305 12.4071 10.0814 12.2571 9.89748 12.2661C7.59634 12.3781 5.14118 13.6115 3.78758 14.477C3.558 14.6238 3.2507 14.4604 3.27412 14.1889Z"
                    fill="#2EA5FF"
                  />
                </svg>
              </div>
            </div>

            <div className={cl.two}>
              <FalseTie
                agree={agree}
                id={task.id}
                task={task}
                navigate={"card"}
              />
              <MyButton
                onClick={() => {
                  openFunc(card);
                }}
              >
                ПОДРОБНЕЕ
              </MyButton>
            </div>
          </div>
        ) : (
          <div
            style={!watchOnly ? { flexDirection: "row" } : {}}
            className={cl.caseRight}
          >
            <div onClick={deleteFunction} className={cl.circle}>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.44336 15.8023H10.7103C11.7605 15.8023 12.4356 15.1681 12.4902 14.1179L12.9471 4.29812H13.6972C14.045 4.29812 14.3109 4.02534 14.3109 3.68438C14.3109 3.34341 14.0382 3.08428 13.6972 3.08428H10.6694V2.06138C10.6694 1.0112 10.0011 0.397461 8.86229 0.397461H6.27094C5.13211 0.397461 4.46382 1.0112 4.46382 2.06138V3.08428H1.44968C1.10871 3.08428 0.835938 3.35023 0.835938 3.68438C0.835938 4.03216 1.10871 4.29812 1.44968 4.29812H2.1998L2.6567 14.1179C2.71125 15.1749 3.37955 15.8023 4.44336 15.8023ZM5.73903 2.12275C5.73903 1.77496 5.98453 1.54993 6.35959 1.54993H8.77363C9.1487 1.54993 9.39419 1.77496 9.39419 2.12275V3.08428H5.73903V2.12275ZM4.57975 14.5817C4.20468 14.5817 3.93191 14.3021 3.91145 13.8997L3.45456 4.29812H11.6718L11.2286 13.8997C11.215 14.3089 10.949 14.5817 10.5603 14.5817H4.57975ZM5.56173 13.4837C5.85496 13.4837 6.03908 13.2996 6.03226 13.0269L5.82768 5.89384C5.82087 5.62107 5.62992 5.44376 5.35033 5.44376C5.06392 5.44376 4.8798 5.62788 4.88662 5.90066L5.0912 13.0337C5.09802 13.3064 5.28896 13.4837 5.56173 13.4837ZM7.57343 13.4837C7.85984 13.4837 8.0576 13.3064 8.0576 13.0337V5.90066C8.0576 5.62788 7.85984 5.44376 7.57343 5.44376C7.28702 5.44376 7.09608 5.62788 7.09608 5.90066V13.0337C7.09608 13.3064 7.28702 13.4837 7.57343 13.4837ZM9.58513 13.4906C9.85791 13.4906 10.0488 13.3064 10.0557 13.0337L10.2602 5.90066C10.2671 5.62788 10.0829 5.45058 9.79653 5.45058C9.51694 5.45058 9.326 5.62788 9.31918 5.90066L9.1146 13.0337C9.10778 13.2996 9.2919 13.4906 9.58513 13.4906Z"
                  fill="#F83D3D"
                />
              </svg>
            </div>
            <div className={cl.circle} onClick={changeFunction}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1685 6.14043C8.49649 8.83967 4.96216 12.41 4.72969 12.6449C4.44872 12.9287 3.98825 12.9997 3.79314 12.9997H2.15368C1.88052 12.9997 1.3342 12.8341 1.3342 12.1718C1.3342 11.5096 1.33372 10.7527 1.3342 10.5162C1.33468 10.2796 1.4287 9.94726 1.68586 9.68832C1.78373 9.58978 5.45724 5.96071 8.23742 3.17949M11.1685 6.14043C11.7259 5.57731 12.2458 5.05211 12.6904 4.60301C12.9245 4.36648 13.2523 3.75151 12.6904 3.18385C12.4172 2.90791 11.7304 2.2141 11.1685 1.64644C10.6066 1.07878 9.99779 1.40992 9.76365 1.64644C9.31459 2.10008 8.7939 2.6228 8.23742 3.17949M11.1685 6.14043L8.23742 3.17949"
                  stroke="#F8DA3D"
                  stroke-width="1.24667"
                />
              </svg>
            </div>
            <div className={cl.circle} onClick={() => {
                                window.Telegram.WebApp.openTelegramLink(
                                  "https://t.me/share/url?text=&url=https://t.me/ConnectexBot/case?startapp=" + String(card.id) + "m" + 2144832745
                                );
              } } >
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.276077 9.79051C0.654811 5.4018 4.77766 2.94086 6.90179 2.6967C7.08468 2.67568 7.23247 2.52734 7.23247 2.34325V0.441076C7.23247 0.144854 7.58998 -0.00420368 7.80041 0.20428L13.11 5.4647C13.2455 5.59895 13.2409 5.81934 13.0999 5.94784L7.79035 10.7874C7.57633 10.9825 7.23247 10.8307 7.23247 10.5411V8.19273C7.23247 8.00863 7.08331 7.85866 6.89943 7.86762C4.59829 7.97969 2.14313 9.21303 0.78953 10.0785C0.559954 10.2253 0.252648 10.062 0.276077 9.79051Z"
                  fill="#2EA5FF"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(Case);
