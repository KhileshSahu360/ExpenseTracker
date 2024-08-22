import React from 'react'
import NotFoundImage from '../../public/NotFound.png'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center'>
      <img src={NotFoundImage} alt="" />
    </div>
  )
}

export default NotFound
