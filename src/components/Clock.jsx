import React, { useContext } from 'react'
import { ClockContext } from '../context/ClockContext'

const Clock = () => {
    const {currentTime} = useContext(ClockContext);
  return (
    <div className='min-w-fit text-center bg-white bg-opacity-10 shadow-lg text-3xl px-3 py-6 font-extrabold rounded-lg'>
      {currentTime}
    </div>
  )
}

export default Clock;
