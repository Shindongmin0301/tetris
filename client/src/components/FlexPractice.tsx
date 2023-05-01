import React from 'react'

const FlexPractice = () => {
  return (
    <div className='flex'>
      <div className='bg-orange-400'>첫번째</div>
      <div className='bg-red-200 order-2'>두번째</div>
      <div className='bg-blue-200 order-3'>세번째</div>
    </div>
  )
}

export default FlexPractice
