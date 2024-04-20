import React, { useCallback, useEffect, useState } from "react";
import {  CSSTransition } from "react-transition-group";
import { motion } from "framer-motion";

import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import BackButton from '../../constants/BackButton'

import { useFilteredArr } from "../../hooks/useFilteredArr";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import MainButton from "../../constants/MainButton";

const First = () => {

  const dispatch = useDispatch();

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );

  const isMenuActive = useSelector((state) => state.menu.value);

  const setMenuActive = useCallback( (set) => {
    dispatch(changeMenuActive(set));
  } , [dispatch])
  
  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);

  const [isDetailsActive, setDetailsActive] = useState(false);
  console.log(isDetailsActive)
  useEffect(() => {
    BackButton.hide()
    MainButton.hide()
  } )

  useEffect(() => {
    let startTouchX = 0;
    let endTouchX = 0;
    let startTouchY = 0;
    let endTouchY = 0;
    function listnerFunctionOne(e) {
      startTouchX = e.changedTouches[0].pageX;
      startTouchY = e.changedTouches[0].pageY;
    }
    function listnerFunctionTwo(e) {
      endTouchX = e.changedTouches[0].pageX;
      endTouchY = e.changedTouches[0].pageY;
      if (
        endTouchX - startTouchX > 80 &&
        Math.abs(startTouchY - endTouchY) < 150
      )
        setMenuActive(true);
      if (isMenuActive) {
        if (
          endTouchX - startTouchX < 80 &&
          Math.abs(startTouchY - endTouchY) < 150
        ) {
          setMenuActive(false);
        }
      }
    }

    document.addEventListener("touchstart", listnerFunctionOne);
    document.addEventListener("touchend", listnerFunctionTwo);

    return () => {
      document.removeEventListener('touchstart' , listnerFunctionOne)
      document.removeEventListener('touchend' , listnerFunctionTwo)
    }
  }, [isMenuActive, setMenuActive]);

  return (
    <motion.div
      style={isMenuActive ? { opacity: "0.3" } : {}}
      className="First"
      onClick={() => {
        if (isMenuActive) {
          setMenuActive(false);
        }
      }}

      initial={{ opacity: 0,  }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <FirstTop
        style={isMenuActive ? { opacity: "0.5" } : {}}
        setMenuActive={setMenuActive}
        setFilterBy={setFilterBy}
      />

      <FirstMain
        style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
        setDetailsActive={setDetailsActive}
        ordersInformation={filteredArr}
      />

      <CSSTransition
        in={isDetailsActive}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="left-right"
      >
        <FirstDetails
          className="FirstDetails"
          setDetailsActive={setDetailsActive}
          isDetailsActive={isDetailsActive}
          orderInformation={ordersInformation[0]}
          similarAds={ordersInformation}
        />
      </CSSTransition>
    </motion.div>
  );
};

export default First;
