import React, { useMemo } from 'react'
import FeatherIcon from 'feather-icons-react'
import classnames from 'classnames'

import { ButtonRelativeLink } from 'lib/components/ButtonRelativeLink'
import { Card, CardSecondaryTitle } from 'lib/components/Card'
import { LoadingDots } from 'lib/components/LoadingDots'
import { NewPrizeCountdown } from 'lib/components/NewPrizeCountdown'
import { RelativeInternalLink } from 'lib/components/RelativeInternalLink'
import { useCoingeckoTokenData } from 'lib/hooks/useCoingeckoTokenData'
import { useAwardsList } from 'lib/hooks/useAwardsList'
import { usePoolChainValues } from 'lib/hooks/usePoolChainValues'

import Sam from 'assets/images/mithrilprize.jpg'

export const PrizeCard = (props) => {
  const { showLinks, className } = props

  const { isFetched: poolChainValuesIsFetched } = usePoolChainValues()

  if (!poolChainValuesIsFetched) return null

  return (
    <Card className={classnames('flex flex-col mx-auto opacity-80', className)}>
      <PrizeSection />
      <NewPrizeCountdown center />

      {showLinks && (
        <div className='flex flex-col mt-4 sm:mt-8 w-full sm:w-2/4 mx-auto'>
          <ButtonRelativeLink link='/home#deposit' size='3xl' color='primary' fullWidth>
            Deposit to win
          </ButtonRelativeLink>
          <div className='flex mt-4 flex-grow justify-between'>
            <RelativeInternalLink link='/manage'>
              Manage pool{' '}
              <FeatherIcon
                icon='settings'
                strokeWidth='0.25rem'
                className={'ml-3 my-auto w-4 h-4 stroke-2 stroke-current'}
              />
            </RelativeInternalLink>
            <RelativeInternalLink link='/home#deposit'>
              Account balance{' '}
              <FeatherIcon
                icon='arrow-right'
                strokeWidth='0.25rem'
                className={'ml-3 my-auto w-4 h-4 stroke-2 stroke-current'}
              />
            </RelativeInternalLink>
          </div>
        </div>
      )}
    </Card>
  )
}

const PrizeSection = (props) => {
  const { awards, loading } = useAwardsList()

  const awardsWithBalances = useMemo(() => awards.filter((token) => !token.balance.isZero()), [
    awards
  ])

  if (loading) {
    return (
      <div className={'op-10'}>
        <LoadingDots />
      </div>
    )
  }

    return (
      <>
        <CardSecondaryTitle className='text-center mb-2 font-bold'>
          Drop your Mithril in the pool for a chance at a custom Mithrilverse NFT and 1000+ Mithril.
          Regain your Mithril (minus a 4% reflection input and 4% reflection withdraw) at any time. 
        </CardSecondaryTitle>
        </>
    )
}

const Prizes = (props) => {
  const { awards } = props

  if (awards.length === 1) {
    return <SinglePrizeItem token={awards[0]} />
  }

  return (
    <ul className='flex flex-col max-w-xs mx-auto' style={{ minWidth: '190px' }}>
      {awards.map((token, index) => {
        return <PrizeListItem small={awards.length > 6} key={index} token={token} index={index} />
      })}
    </ul>
  )
}

const SinglePrizeItem = (props) => {
  const { token } = props
  const { data: tokenData } = useCoingeckoTokenData(token.address)
  const imageUrl = tokenData?.image?.large

  return (
    <div className={'opacity-80 flex mx-auto my-2 sm:mt-0 sm:mb-2 leading-none'}>
      {imageUrl && (
        <img src={imageUrl} className='w-8 h-8 sm:w-16 sm:h-16 mr-4 my-auto rounded-full' />
      )}
      <span className='font-bold text-6xl sm:text-9xl mr-4 my-auto'>
        {token.formattedBalance} and a custom NFT
      </span>
      <span className='font-bolt text-sm sm:text-4xl mt-auto mb-2'>{token.symbol}</span>
    </div>
  )
}

const PrizeListItem = (props) => {
  const { token, small } = props
  const index = props.index || 0
  const { data: tokenData } = useCoingeckoTokenData(token.address)
  const imageUrl = tokenData?.image?.small

  return (
    <li key={index + token.symbol} className='flex w-full items-center justify-between mb-2'>
      <span
        className={classnames('font-bold text-flashy leading-none', {
          'text-md sm:text-xl': small,
          'text-xl sm:text-5xl': !small
        })}
      >
        {token.formattedBalance}
      </span>
      <div
        className={classnames('flex ml-2', {
          'text-sm sm:text-lg': small,
          'text-lg sm:text-3xl': !small
        })}
      >
        {imageUrl && <img className='my-auto mr-2 w-6 h-6 rounded-full' src={imageUrl} />}
        <span className='leading-none mt-auto'>{token.symbol || token.name || ''}</span>
      </div>
    </li>
  )
}
