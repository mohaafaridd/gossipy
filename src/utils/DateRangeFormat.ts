import { DateRange } from '../interfaces/Topic'

const formatDateRange = (date: DateRange) => {
  switch (date) {
    case 'TODAY':
      return 'Today'

    case 'THREE_DAYS':
      return '3 Days'

    case 'WEEK':
      return 'Week'

    case 'MONTH':
      return 'Month'

    case 'THREE_MONTH':
      return '3 Months'

    case 'SIX_MONTH':
      return '6 Months'

    case 'YEAR':
      return 'Year'

    case 'EVER':
      return 'Ever'

    default:
      return 'Today'
  }
}

export default formatDateRange
