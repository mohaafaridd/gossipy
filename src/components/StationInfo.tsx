import React from 'react'
import { useCountUp } from 'react-countup'
import { Station } from '../interfaces/Station'
import useGradiant from '../hooks/useGradiant'
import moment from 'moment'

const StationInfo = ({ station }: { station: Station }) => {
  const [, , [bg]] = useGradiant()
  const { topics, members } = station

  const activeMembers = members?.filter(
    membership => membership.state === 'ACTIVE'
  )

  const { countUp: membershipsCounter } = useCountUp({
    end: activeMembers?.length || 0,
    duration: 2
  })

  const { countUp: topicsCounter } = useCountUp({
    end: topics?.length || 0,
    duration: 2
  })

  const date = moment(station.createdAt).format('Do MMM YYYY')

  return (
    <div id='station-info' className={bg}>
      <h2>{station.name}</h2>

      <small>{date}</small>

      <div className='counters'>
        <div className='counter'>
          <div>{membershipsCounter} Members</div>
        </div>
        <div className='counter'>
          <div>{topicsCounter} Topics</div>
        </div>
      </div>
    </div>
  )
}

export default StationInfo
