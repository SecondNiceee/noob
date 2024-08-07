import React from "react";
import Photos from "../../components/First/FirstMain/Photos";
import { useDispatch, useSelector } from "react-redux";
import { deleteResponse, deleteResponseLocal, fetchALLResponses } from "../../store/responses";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import { useRef } from "react";
import makeNameFiles from "../../functions/makeNameFiles";
import makeNewFile from "../../functions/newMakeFile";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import Popup from "../Popup";
import useListner from "../../hooks/useListner";
import Top from "../../components/UI/Top/Top";
import { changeMenuActive } from "../../store/menuSlice";

const ModerResponse = ({ information, photos ,e,  setShow }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        color: "white",
        fontFamily: "SF Pro Display",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
      className="First__block"
    >
      <Photos photos={photos} />
      <p className="response-modern-text">{information}</p>
      <button onClick={() => {
        setShow({
            isActive : true,
            id : e.id,
            responseName : e.information,
            userId : e.user.id
        })
      }}  className="deleteResponse">Удалить</button>
    </div>
  );
};

const AllResponses = () => {

    const dispatch = useDispatch();

    const isMenuActive = useSelector((state) => state.menu.value);
    const setMenuActive = useCallback(
        (arg) => {
          dispatch(changeMenuActive(arg));
        },
        [dispatch]
      );
      
    useListner({
        isMenuActive,
        setMenuActive,
      });



  const [page, setPage] = useState(1);
  const elementRef = useRef(null);

  const orderStatus = useSelector((state) => state.responses.ALLReponsesStatus);
  const ordersInformation = useSelector((state) => state.responses.ALLReponses);

  const getMore = useCallback(async () => {
    dispatch(fetchALLResponses([page]));
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

  console.log(ordersInformation);

  const [isShow , setShow] = useState( {
    isActive : false,
    id : 0,
    userId : 0,
    responseName : 0
  } )


  const extraDeleteFunction = useCallback(  () => {
    const text = isShow.responseName.length > 20 ? isShow.responseName.splice(0,20) + "..." : isShow.responseName
    async function deleteAd(params) {
      try {
        await axios.delete("https://back-birga.ywa.su/response", {
          params: {
            id: isShow.id,
          },
        });
  
        await axios.get("https://back-birga.ywa.su/user/sendMessage" , {
          params : {
            "chatId" : isShow.userId,
            "buttonUrl" : "https://t.me/ConnectexBot/myapp",
            "text" : "📣 ‼️Ваш отклик «" + text  + "» был удален в связи с нарушениями правил Коннект Биржи"
          }
        })
        dispatch(deleteResponseLocal(isShow.id))
        setShow(false)
        

      } catch (e) {
        alert("Не удалось удалить отклик , возможно оно уже был удален.");
        console.warn(e);
      }
    }

    deleteAd()



  }, [isShow] )

  return (
    <>
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
      className="FirstMain"
    >

      {ordersInformation.length === 0 ? (
        <h1 className="EmptyText"> Нет таких предложений </h1>
      ) : (
        ordersInformation.map((e, i) => {
          return (
            <ModerResponse setShow={setShow} e={e}  information={e.information} photos={e.photos} />
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

    <CSSTransition classNames={"show"} in = {isShow.isActive} timeout={200} mountOnEnter unmountOnExit >
          <Popup setShow={setShow} clickHandler={extraDeleteFunction} text={"Удалить этот отклик?"} />
    </CSSTransition>
    </>
  );
};

export default AllResponses;
