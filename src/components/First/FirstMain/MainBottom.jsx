import React, { memo } from 'react';
import FirstMainBottomLeft from './FirstMainBottomLeft';
import MainBottomRight from './MainBottomRight';

const MainBottom = ({tonConstant, tonValue, isMyAds, myAdsFunc, isButton, end, id, agree, task, isResponce, setDetailsActive,index, dispatch,deleteFunction , setShow, user}) => {
    return (
        <div className="FirstMain__bottom">
            <FirstMainBottomLeft tonConstant={tonConstant} tonValue={tonValue} />
            <MainBottomRight 
              setShow = {setShow}
              user = {user}
              isMyAds = {isMyAds}
              myAdsFunc = {myAdsFunc}
              isButton = {isButton}
              end = {end}
              id = {id}
              agree = {agree}
              task = {task}
              isResponce = {isResponce}
              setDetailsActive = {setDetailsActive}
              index = {index}
              dispatch = {dispatch}
              deleteFunction = {deleteFunction}
             />
      </div>
    );
};

export default memo(MainBottom);