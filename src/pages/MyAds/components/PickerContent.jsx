import React from 'react';
import { Link } from 'react-router-dom';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
const PickerContent = ({myAdsArray  , setSecondPage , setDetailsActive , setDetails}) => {
    return (
    <div className="PickerContent">
        <div className="picler__block">

          <AdCreateFunc text={"Создать объявление"} link={'/AdCreating'} />
          {/* <Link to="/AdCreating" className="AdCreactingFunction">
            <img src={plus} alt="" />
            <p>Создать объявление</p>
          </Link> */}
          <div className="AdsContainer">
            {myAdsArray.map((e, i) => {
              return (
                <div key={i}
                  className="block"
                  onClick={(e) => {
                    if (e.target.closest('.FirstMain__bottom-right') === null){
                      //  setTask(e);
                      setSecondPage(true);
                    }
                  }}
                >
                  <FirstBlock
                    key={i}
                    isButton={true}
                    setDetailsActive={() => {
                      setDetails({
                        isActive : true,
                        task : myAdsArray[i],
                        index : i
                      })

                    }}
                    {...e}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default PickerContent;