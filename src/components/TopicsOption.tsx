import React, { useState, useContext } from 'react'
import { SortType, DateRange } from '../interfaces/Topic'
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/core'

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
      <Menu>
        <MenuButton as={Button}>{sortType}</MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleSortType('HOT')}>Hot</MenuItem>
          <MenuItem onClick={() => handleSortType('TOP')}>Top</MenuItem>
          <MenuItem onClick={() => handleSortType('NEW')}>New</MenuItem>
        </MenuList>
      </Menu>

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
