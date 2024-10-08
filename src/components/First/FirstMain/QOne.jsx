import React from "react";
import MyButton from "../../UI/MyButton/MyButton";

const QOne = ({isMyAds, myAdsFunc, isButton}) => {
  return (
    <>
      {isMyAds ? (
        <>
          <MyButton
            style={isButton ? {} : { display: "none" }}
            onClick={(e) => myAdsFunc(true)}
          >
            Подробнее
          </MyButton>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default QOne;
