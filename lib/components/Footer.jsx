import React from 'react'

export const Footer = () => {

  return (
    <footer className='footer w-full text-default text-sm sm:px-8 lg:px-0 mt-48'>
      <div className='nav-and-footer-container'>
        <div className='flex flex-col sm:flex-row justify-between mt-3 sm:mt-4 lg:mt-6 pb-5 lg:pb-8'>
          <div className=''>
            <a title='faq' className='trans mr-4 sm:ml-8' href='https://www.pooltogether.com/faq'>
              faq
            </a>
            {/* <a
          title='readTheFAQ'
          className='trans mr-4'
          href='https://www.pooltogether.com/faq'
        >
          faq
        </a>

        <a
          title='seeStats'
          className='trans mr-4'
          href='https://www.pooltogether.com/#stats'
        >
          stats
        </a> */}

          </div>

        </div>
      </div>
    </footer>
  )
}
