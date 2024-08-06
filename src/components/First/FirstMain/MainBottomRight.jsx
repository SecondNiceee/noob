import React, { useCallback } from "react";
import QOne from "./QOne";
import QTwo from "./QTwo";
import QThree from "./QThree";
import QFour from "./QFour";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";



const MainBottomRight = ({
  isMyAds,
  myAdsFunc,
  isButton,
  end,
  id,
  agree,
  task,
  isResponce,
  setDetailsActive,
  index,
  dispatch,
  deleteFunction,
  setShow,
  user
}) => {



  const clickHandler = useCallback( () => {
    setShow({isActive : true , 
      taskName : task.taskName,
      userId : task.user.id,
      id : id
    })
  } , [setShow] )
  return (
    <div className="FirstMain__bottom-right">
      <QOne isMyAds={isMyAds} myAdsFunc={myAdsFunc} isButton={isButton} />

      <QTwo
        end={end}
        agree={agree}
        id={id}
        task={task}
        isButton={isButton}
        isResponce={isResponce}
        isMyAds={isMyAds}
      />

      <QThree
        isMyAds={isMyAds}
        isButton={isButton}
        isResponce={isResponce}
        setDetailsActive={setDetailsActive}
        index={index}
        dispatch={dispatch}
        id={id}
      />

      <svg
        id="myTrash"
        onClick={clickHandler}
        className="my-trash"
        width="16"
        height="19"
        viewBox="0 0 16 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.47464 18.4487H11.6001C12.7941 18.4487 13.5617 17.7276 13.6237 16.5336L14.1432 5.36859H14.9961C15.3915 5.36859 15.6939 5.05845 15.6939 4.67077C15.6939 4.2831 15.3838 3.98847 14.9961 3.98847H11.5536V2.82544C11.5536 1.63141 10.7937 0.933594 9.49889 0.933594H6.55257C5.25774 0.933594 4.4979 1.63141 4.4979 2.82544V3.98847H1.07086C0.683186 3.98847 0.373047 4.29085 0.373047 4.67077C0.373047 5.0662 0.683186 5.36859 1.07086 5.36859H1.92374L2.44323 16.5336C2.50525 17.7354 3.2651 18.4487 4.47464 18.4487ZM5.9478 2.89522C5.9478 2.4998 6.22692 2.24393 6.65337 2.24393H9.3981C9.82454 2.24393 10.1037 2.4998 10.1037 2.89522V3.98847H5.9478V2.89522ZM4.62971 17.0608C4.20327 17.0608 3.89313 16.7429 3.86987 16.2855L3.35038 5.36859H12.6933L12.1894 16.2855C12.1738 16.7507 11.8715 17.0608 11.4295 17.0608H4.62971ZM5.74621 15.8125C6.07961 15.8125 6.28895 15.6032 6.2812 15.293L6.04859 7.1829C6.04084 6.87276 5.82374 6.67117 5.50585 6.67117C5.1802 6.67117 4.97086 6.88051 4.97861 7.19065L5.21122 15.3008C5.21897 15.6109 5.43607 15.8125 5.74621 15.8125ZM8.03349 15.8125C8.35913 15.8125 8.58398 15.6109 8.58398 15.3008V7.19065C8.58398 6.88051 8.35913 6.67117 8.03349 6.67117C7.70784 6.67117 7.49074 6.88051 7.49074 7.19065V15.3008C7.49074 15.6109 7.70784 15.8125 8.03349 15.8125ZM10.3208 15.8203C10.6309 15.8203 10.848 15.6109 10.8558 15.3008L11.0884 7.19065C11.0961 6.88051 10.8868 6.67892 10.5611 6.67892C10.2432 6.67892 10.0261 6.88051 10.0184 7.19065L9.78577 15.3008C9.77802 15.6032 9.98736 15.8203 10.3208 15.8203Z"
          fill="#F83D3D"
        />
      </svg>


      


    </div>
  );
};

export default MainBottomRight;
