import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuActive } from '../store/menuSlice';
import useListner from '../hooks/useListner';

const Values = () => {
    const dispatch = useDispatch()
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
    const values = useSelector(state => state.shablon.value)
    console.log(values)
    return (
        <div className='values__wrapper'>
            <div className="block">Пользователей</div>
            <div className="block">{values.users}</div>
            <div className="block">Заданий</div>
            <div className="block">{values.advertisements}</div>
            <div className="block">Завершенных заданий</div>
            <div className="block">{values.completedAdvertisements}</div>
            <div className="block">Заданий в процессе</div>
            <div className="block">{values.advertisementsInProcess}</div>
            <div className="block">Откликов</div>
            <div className="block">{values.reponses}</div>
        </div>
    );
};

export default Values;