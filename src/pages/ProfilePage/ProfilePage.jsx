import React, { memo, useCallback, useEffect, useState } from "react";

import { CSSTransition } from "react-transition-group";
import CardPage from "../CardPage/CardPage";
import Stage from "../../components/UI/Stage/Stage";
import AboutMain from "../MyAds/components/AboutMain";
import AboutInfo from "../MyAds/components/AboutInfo";
import AboutTop from "../MyAds/components/AboutTop";
import Top from "../../components/UI/Top/Top";
import axios from "axios";
import ExampleWorks from "../MyAds/components/ExampleWorks";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import { useDispatch } from "react-redux";
import makeNewFile from "../../functions/newMakeFile";
import Compact from "../../components/UI/Compact/Compact";
import { changeMenuActive } from "../../store/menuSlice";
import "../MyAds/MyAds.css"
import BackButton from "../../constants/BackButton";
import { useNavigate } from "react-router-dom";
// const parOne = 2144832745;
// const parTwo = 1;
const ProfilePage = ({ ...props }) => {
  const [responce, setResponce] = useState(null);
  useEffect(() => {});


//   window.Telegram.WebApp.showAlert(window.Telegram.WebApp.initDataUnsafe.start_param)


  const dispatch = useDispatch();
  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );

  const navigate = useNavigate()



  const [cards, setCards] = useState(null);
  const [oneCards, setOneCard] = useState({
    isOpen: true,
    card: {    id: 0,
        title: "",
        description: "",
        behanceLink: "",
        dribbbleLink: "",
        dropfileLink: "",
        photosNames: "",
        photos: [],},
  });

  useEffect( () => {
    function backFunction(){
        if (oneCards.isOpen){
            setOneCard((value) => ({...value , isOpen : false}))
        }
        else{
            navigate("/")
        }
    }

    BackButton.show()
    BackButton.onClick(backFunction)
    return () => {
        BackButton.hide()
        BackButton.offClick(backFunction)
    }
  } , [oneCards.isOpen, navigate] )



  useEffect(() => {
    async function getAllCards() {
      let localCards = [];
      try {
        const user = await axios.get("https://back-birga.ywa.su/user/findOne", {
          params: {
            id: Number(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[1]),
          },
        });

        let imTwo = await axios.get(
            "https://back-birga.ywa.su/advertisement/findCount",
            {
              params: {
                userId: Number(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[1]),
              },
            }
          );

        const cardOne = await axios.get("https://back-birga.ywa.su/card/findOne" , {
            params : {
                id : Number(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[0])
            }
        })

        let allCards = await axios.get(
          "https://back-birga.ywa.su/card/findByUser",
          {
            params: {
              userId: user.data.id,
            },
          }
        );

        for (let e of allCards.data) {
          let files = await makeNewFile(e.folder, e.photos);
          localCards.push({
            id: e.id,
            title: e.title,
            description: e.description,
            behanceLink: e.behance,
            dribbbleLink: e.dribble,
            dropfileLink: e.dropFile,
            photosNames: e.photos,
            photos: files,
          });
        }
        let newFiles = await makeNewFile(cardOne.data.folder, cardOne.data.photos);
        return {
          localCards: localCards,
          responce: { user: user.data, createNumber : imTwo.data },
          card : {
            id: cardOne.data.id,
            title: cardOne.data.title,
            description: cardOne.data.description,
            behanceLink: cardOne.data.behance,
            dribbbleLink: cardOne.data.dribble,
            dropfileLink: cardOne.data.dropFile,
            photosNames: cardOne.data.photos,
            photos: newFiles,
          }
        };
      } catch (e) {
        
        window.Telegram.WebApp.showAlert("Ссылка уже не действительна. Возможно, данные были удалены");
        navigate("/")
        console.log(e);
      }
    }
    getAllCards().then((value) => {
      setCards(value.localCards);
      setResponce(value.responce);
      setOneCard({isOpen : true , card : value.card})
    });
    // eslint-disable-next-line
  }, []);

  const openFunc = useCallback(
    (par) => {
      setOneCard({ isOpen: true, card: par });
    },
    [setOneCard]
  );

  return (

    <>
    <div style={
        {
            transform : "translateX(0%)"
        }
    } className="aboutReaction" {...props}>

      {responce !== null ? (
        <>
          <Top setMenuActive={setMenuActive} name={"Отклики"} />

          <AboutTop responce={responce} />

          <AboutInfo responce={responce} />

          <AboutMain aboutU={responce.user.about} />

          <Compact className={"stage-compact"} title={"Стаж работы"}>
            <Stage numberB={responce.user.stage} />
          </Compact>



          {cards === null ? (
            <MyLoader />
          ) : (
            <ExampleWorks openFunc={openFunc} cards={cards} />
          )}
        </>
      ) : (
        <MyLoader />
      )}
    </div>

    <CSSTransition
            classNames="left-right"
            in={oneCards.isOpen}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <CardPage style = {oneCards.isOpen ? {transform : "translateX(0px)"} : {}} card={oneCards.card} />
          </CSSTransition>


    </>
  );
};
export default memo(ProfilePage);
