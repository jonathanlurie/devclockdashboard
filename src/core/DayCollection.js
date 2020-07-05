import Day from './Day'

class DayCollection {
  constructor() {
    this._collection = {}
    this._mostRecentDate = null
  }


  reset() {
    this._collection = {}
  }


  hasDay(date) {
    return (date in this._collection)
  }


  getDay(date) {
    if (date in this._collection) {
      return this._collection[date]
    } else {
      return null
    }
  }

  getMostRecentDay() {

  }


  addDevEvent(de) {
    const date = de.date
    let day = this._collection[date]
    if (!day) {
      day = new Day(date)
      this._collection[date] = day
    }
    day.addDevEvent(de)
  }


  getPeakHour() {
    let dates = Object.keys(this._collection)
    let maxEvents = 0
    let maxDate = null
    let data = null

    for (let i = 0; i < dates.length; i += 1) {
      const day = this._collection[dates[i]]
     
      const tmpData = day.getPeakHour()

      if (tmpData.maxEvents > maxEvents) {
        data = tmpData
        maxEvents = tmpData.maxEvents
        maxDate = dates[i]
      }
    }

    return {
      date: maxDate,
      ...data
    }
  }


  getAvailableDays(order = -1) {
    return Object.keys(this._collection)
      .sort((a, b) => new Date(a) > new Date(b) ? 1 * order : -1 * order)
      .map((date) => this._collection[date])
  }

  
}

export default DayCollection