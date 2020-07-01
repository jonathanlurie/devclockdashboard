import Day from './Day'

class DayCollection {
  constructor() {
    this._collection = {}
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


  addDevEvent(de) {
    const date = de.date
    let day = this._collection[date]
    if (!day) {
      day = new Day(date)
      this._collection[date] = day
    }

    day.addDevEvent(de)
  }

  
}

export default DayCollection