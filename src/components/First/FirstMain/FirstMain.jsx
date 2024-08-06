import React, {  memo, useCallback, useEffect, useRef, useState } from "react";
import FirstBlock from "./FirstBlock";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../UI/MyLoader/MyLoader";
import {  fetchTasksInformation } from "../../../store/information";

const FirstMain = (
  (
    {
      ordersInformation,
      setDetailsActive,
      orderStatus,
      setShow
    }
  ) => {

    const dispatch = useDispatch()
    const watchedArr = useSelector((state) => state.watchedAds.watchedAds);

    const [page , setPage] = useState(2)
    const elementRef = useRef(null)

    const getMore = useCallback(async () => {
      dispatch(fetchTasksInformation(page));
      setPage(page + 1);
    }, [page, setPage, dispatch]);

    const onIntersaction = useCallback(
      (entries) => {
        const firtEntry = entries[0];
        if (firtEntry.isIntersecting && orderStatus !== "all") {
          getMore();
        }
      },
      [orderStatus, getMore]
    );
    useEffect(() => {
      const observer = new IntersectionObserver(onIntersaction);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [ordersInformation]);



    return (
      <div  className="FirstMain">
        {ordersInformation.length === 0 ? (
          <h1 className="EmptyText"> Нет таких предложений </h1>
        ) : (
          ordersInformation.map((e, i) => {
            return (
              <FirstBlock
                setShow = {setShow}
                index={i}
                isWatched={watchedArr.includes(e.id) ? true : false}
                key={i}
                setDetailsActive={setDetailsActive}
                task={e}
                {...e}
                isButton={true}
              />
            );
          })
        )}



          
          

    
        

        

        {orderStatus !== "all" && (
          <MyLoader
            ref={elementRef}
            className="block"
            style={{
            
              transform: "translateX(-16px)",
              width: "100vw",
              height: "300px",
            }}
          />
        )}
      </div>
    );
  }
);

export default memo(FirstMain);
