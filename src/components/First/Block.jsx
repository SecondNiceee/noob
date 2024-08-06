import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Photos from "./FirstMain/Photos";
import MyAdsTop from "./FirstMain/MyAdsTop";
import FirstMainTop from "./FirstMain/FirstMainTop";
import FirstMainMiddle from "./FirstMain/FirstMainMiddle";
import MainBottom from "./FirstMain/MainBottom";

const Block = ({
  className,
  taskName,
  time,
  end = false,

  setDetailsActive,
  isButton,
  photos,
  isMyAds,
  deleteFunction,
  myAdsFunc,
  isResponce,
  isWatched,
  index,
  id,
  setSlideActive,
  tonValue,
  task,
  agree = false,
  responseCounter,
  viewsNumber,
  category,
  user,
  setShow
}) => {
  const dispatch = useDispatch();
  const tonConstant = useSelector((state) => state.ton.value);

  return (
    <>
      {photos && (
        <div
          className={
            className ? ["First__block", className].join(" ") : "First__block"
          }
        >
          <Photos photos={photos} />

          <MyAdsTop isMyAds={isMyAds} isResponce={isResponce} viewsNumber={viewsNumber} responseCounter={responseCounter} />

          <FirstMainTop isMyAds={isMyAds} category={category} isWatched={isWatched} taskName={taskName} id={id}  end={end} />

          <FirstMainMiddle time={time} />

          <MainBottom 
            setShow = {setShow}
          {...{tonConstant, tonValue, isMyAds, myAdsFunc, isButton, end, id, agree, task, isResponce, setDetailsActive,index, dispatch,deleteFunction,user }}
            />
        </div>
      ) 
    }
    </>
  );
};

export default memo(Block);
