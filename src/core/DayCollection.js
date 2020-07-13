import Day from './Day'

class DayCollection {
  constructor() {
    this._collection = {}
    this._totalDay = new Day()
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
    return this._collection[this._mostRecentDateLiteral]
  }


  addDevEvent(de) {
    const date = de.date
    let day = this._collection[date]
    if (!day) {
      day = new Day(date)
      this._collection[date] = day
    }
    day.addDevEvent(de)
    // also adding to the total day
    this._totalDay.addDevEvent(de)
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


  getLastDay() {
    let lastDay = null
    try {
      lastDay = this.getAvailableDays()[0]
    } catch(e) {}
    return lastDay
  }


  getNumberOfEvents(options = {}) {
    return Object.keys(this._collection)
      .map((k) => this._collection[k].getNumberOfEvents(options))
      .reduce((acc, v) => acc + v, 0)
  }


  getTotalDay() {
    return this._totalDay
  }
  
}

export default DayCollection