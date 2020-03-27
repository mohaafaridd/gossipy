import React, { useState, useContext } from 'react'
import { SortType, DateRange } from '../interfaces/Topic'
import {
  Menu,
  Button,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip
} from '@chakra-ui/core'
import { FaHotjar, FaStar } from 'react-icons/fa'
import { GiPlainArrow } from 'react-icons/gi'

import TopicContext from '../context/topics/topicContext'
import formatDateRange from '../utils/DateRangeFormat'
import MenuButton from './MenuButton'

const TopicsOption = () => {
  const topicContext = useContext(TopicContext)

  const [sortType, setSortType] = useState<SortType>(
    topicContext.sortType || 'HOT'
  )
  const [dateRange, setDateRange] = useState<DateRange>(
    topicContext.dateRange || 'TODAY'
  )
  const [visualDate, setVisualDate] = useState(
    formatDateRange(topicContext.dateRange || 'TODAY')
  )

  const handleSortType = (sortType: SortType) => {
    setSortType(sortType)
    topicContext.setConditions(dateRange, sortType)
  }

  const handleDateRange = (dateRange: DateRange) => {
    setDateRange(dateRange)
    setVisualDate(formatDateRange(dateRange))
    topicContext.setConditions(dateRange, sortType)
  }

  return (
    <div id='topics-options'>
      <Tooltip aria-label='tooltip' hasArrow label='Hot' placement='bottom'>
        <IconButton
          className={`btn hot ${sortType === 'HOT' ? `active` : ''}`}
          icon={FaHotjar}
          aria-label='hot'
          onClick={() => handleSortType('HOT')}
        />
      </Tooltip>
      <Tooltip aria-label='tooltip' hasArrow label='Top' placement='bottom'>
        <IconButton
          className={`btn top ${sortType === 'TOP' ? `active` : ''}`}
          icon={FaStar}
          aria-label='top'
          onClick={() => handleSortType('TOP')}
        />
      </Tooltip>
      <Tooltip aria-label='tooltip' hasArrow label='New' placement='bottom'>
        <IconButton
          className={`btn new ${sortType === 'NEW' ? `active` : ''}`}
          icon={GiPlainArrow}
          aria-label='new'
          onClick={() => handleSortType('NEW')}
        />
      </Tooltip>

      <Menu>
        <MenuButton as={Button} rightIcon='chevron-down'>
          {visualDate}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleDateRange('TODAY')}>
            {formatDateRange('TODAY')}
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('THREE_DAYS')}>
            {formatDateRange('THREE_DAYS')}
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('WEEK')}>
            {formatDateRange('WEEK')}
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('MONTH')}>
            {formatDateRange('MONTH')}
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('THREE_MONTH')}>
            {formatDateRange('THREE_MONTH')}
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('SIX_MONTH')}>
            {formatDateRange('SIX_MONTH')}
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('YEAR')}>
            {formatDateRange('YEAR')}
          </MenuItem>
          <MenuItem onClick={() => handleDateRange('EVER')}>
            {formatDateRange('EVER')}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default TopicsOption
