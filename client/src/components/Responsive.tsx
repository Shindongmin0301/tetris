import { useMediaQuery } from '@mui/material'
import React from 'react'

const Responsive = () => {
  const mobile = useMediaQuery('(max-width: 640px)')
  const smallScreen = useMediaQuery(
    '(min-width: 641px) and (max-width: 1150px)'
  )
  const desktop = useMediaQuery('(min-width: 1151px)')

  return (
    <div className='w-screen h-full'>
      {desktop && <div className='bg-red-100'>Desktop</div>}
      {smallScreen && <div className='bg-blue-100'>smallScreen</div>}
      {mobile && <div className='bg-green-100'>mobile</div>}
    </div>
  )
}

export default Responsive
