import React, { useState, useContext } from 'react'
import { SortType, DateRange } from '../interfaces/Topic'
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip
} from '@chakra-ui/core'
import { FaHotjar, FaStar } from 'react-icons/fa'
import { GiPlainArrow } from 'react-icons/gi'

import TopicContext from '../context/topics/topicContext'

const TopicsOption = () => {
  const topicContext = useContext(TopicContext)
  const [sortType, setSortType] = useState<SortType>('HOT')
  const [dateRange, setDateRange] = useState<DateRange>('TODAY')
  const handleSortType = (sortType: SortType) => {
    setSortType(sortType)
    topicContext.setConditions(dateRange, sortType)
  }

  const handleDateRange = (dateRange: DateRange) => {
    setDateRange(dateRange)
    topicContext.setConditions(dateRange, sortType)
  }

  return (
    <div id='topics-options'>
      <Tooltip aria-label='tooltip' hasArrow label='Hot'>
        <IconButton
          className={`btn hot ${sortType === 'HOT' ? `active` : ''}`}
          icon={FaHotjar}
          aria-label='hot'
          onClick={() => handleSortType('HOT')}
        />
      </Tooltip>
      <Tooltip aria-label='tooltip' hasArrow label='Top'>
        <IconButton
          className={`btn top ${sortType === 'TOP' ? `active` : ''}`}
          icon={FaStar}
          aria-label='top'
          onClick={() => handleSortType('TOP')}
        />
      </Tooltip>
      <Tooltip aria-label='tooltip' hasArrow label='New'>
        <IconButton
          className={`btn new ${sortType === 'NEW' ? `active` : ''}`}
          icon={GiPlainArrow}
          aria-label='new'
          onClick={() => handleSortType('NEW')}
        />
      </Tooltip>

      <Menu>
        <MenuButton as={Button}>{dateRange}</MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleDateRange('TODAY')}>Today</MenuItem>
          <MenuItem onClick={() => handleDateRange('THREE_DAYS')}>
            3 Days
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('WEEK')}>7 Days</MenuItem>
          <MenuItem onClick={() => handleDateRange('MONTH')}>Month</MenuItem>
          <MenuItem onClick={() => handleDateRange('THREE_MONTH')}>
            3 Months
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('SIX_MONTH')}>
            6 Months
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('YEAR')}>Year</MenuItem>
          <MenuItem onClick={() => handleDateRange('EVER')}>
            All The Time
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default TopicsOption
