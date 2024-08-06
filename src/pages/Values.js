import React from 'react';
import { useSelector } from 'react-redux';

const Values = () => {
    const values = useSelector(state => state.shablon.value)
    console.log(values)
    return (
        <div className='wrapper'>
            
        </div>
    );
};

export default Values;