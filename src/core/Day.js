
class Day {
  constructor(date) {
    this._date = date
    this._devEventsPerHour = []
    // adding an empty entry for each hour
    for (let i = 0; i < 24; i += 1) {
      this._devEventsPerHour[i] = []
    }

    this._alldevEvents = []
    this._alldevEventsPerId = {}
  }


  get date() {
    return this._date
  }

  get devEventsPerHour() {
    return this._devEventsPerHour.slice()
  }


  addDevEvent(de) {
    if (de.id in this._alldevEventsPerId) {
      return
    }

    this._alldevEventsPerId[de.id] = de
    this._alldevEvents.push(de)
    this._devEventsPerHour[parseInt(de.hour)].push(de)
  }


  getEvents(options = {}) {
    const hour = 'hour' in options ? options.hour : null
    const type = 'type' in options ? options.type : null

    let events = []
    if (hour && hour <=23 && hour >= 0) {
      events = this._devEventsPerHour[hour].slice()
    } else {
      events = this._alldevEvents.slice()
    }

    if (type) {
      events = events.filter((de) => de.type.toLowercase() === type.toLowercase())
    }

    return events
  }


  getNumberOfEvents(options = {}) {
    return this.getEvents(options).length
  }


  getPeakHour() {
    let maxEvents = 0
    let hour = 0

    for (let i = 0; i < 24; i += 1) {
      if (this._devEventsPerHour[i].length > maxEvents) {
        maxEvents = this._devEventsPerHour[i].length
        hour = i
      }
    }

    return {
      maxEvents,
      hour
    }
  }
  
}

export default Day