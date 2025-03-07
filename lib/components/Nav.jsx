import React from 'react'
import Link from 'next/link'

import { ConnectWalletButton } from 'lib/components/ConnectWalletButton'
import { WalletInfo } from 'lib/components/WalletInfo'
import { useWalletNetwork } from 'lib/hooks/useWalletNetwork'

import MithrilLogo from 'assets/images/mithril-logo.png'
import MithrilPLogo from 'assets/images/mithril-logo.png'

export const Nav = (props) => {
  const { walletConnected } = useWalletNetwork()

  return (
    <>
      <div className='nav-and-footer-container'>
        <nav className='sm:px-8 lg:px-0 nav-min-height flex items-center h-full justify-between flex-wrap'>
          <div className='w-2/5 lg:w-1/5 justify-start h-full flex items-center truncate'>
              <a title={'Back to home'} className='border-0'>
                <img
                  alt={`Mithril Logo`}
                  src={MithrilLogo}
                  className='mr-auto lg:m-0 w-32 hidden sm:block'
                />
                <img
                  alt={`Mithril P Logo`}
                  src={MithrilPLogo}
                  className='mr-auto lg:m-0 w-6 block sm:hidden'
                />
              </a>yarn dev
          </div>

          <div className='w-1/5 lg:w-3/5 flex justify-center h-full text-center lg:text-right'>
            &nbsp;
          </div>

          <div className='w-2/5 lg:w-1/5 flex justify-end h-full items-center text-right'>
            <div className='mt-0 sm:mt-0 text-xxs sm:text-xs tracking-wide text-right spinner-hidden'>
              {walletConnected ? <WalletInfo {...props} /> : <ConnectWalletButton size='sm' />}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
