import React from 'react'

import MithrilMark from 'assets/images/mithrilicon.png'
import { LoadingDots } from 'lib/components/LoadingDots'

export const PoolTogetherLoading = () => {
  return (
    <div className='m-auto flex flex-col'>
      <img
        src={MithrilMark}
        className='w-8 h-16 outline-none mx-auto mb-8'
        style={{ borderWidth: 0 }}
      />
      <LoadingDots />
    </div>
  )
}
