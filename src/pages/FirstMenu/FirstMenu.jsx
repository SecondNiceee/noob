import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuActive } from '../../store/menuSlice';
import {Link} from 'react-router-dom'
import Close from '../../components/UI/Close';
import Human from '../../components/UI/Human/Human'
import SmallDimond from '../../components/UI/SmallDimond/SmallDimond';
import userPhoto from "../../images/userPhoto/user.png"

const FirstMenu = () => {

    const dispatch = useDispatch()

    const isMenuActive = useSelector(state => state.menu.value)

    const setMenuActive = (set) => {
        dispatch(changeMenuActive(set))
    }
    const userInfo = useSelector(state => state.telegramUserInfo)
    return (
        <div className= {  isMenuActive ? 'FirstMenu'  :  'FirstMenu hidden'  }>

            <Close isMenuActive = {isMenuActive} setMenuActive = {setMenuActive}  />





            <div className='MenuList'>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink' to = '/'>Все задания</Link>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink'  to='/AllResponses'>Все отклики</Link>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink'  to='/savedPage'>Счетчики</Link>
            </div>



        </div>
    );
};

export default FirstMenu;

