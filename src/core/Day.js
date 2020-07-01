
class Day {
  constructor(date) {
    this._date = date
    this._devEventsPerHour = {}
    // adding an empty entry for each hour
    for (let i = 0; i < 24; i += 1) {
      this._devEventsPerHour[i] = []
    }

    this._alldevEvents = []
    this._alldevEventsPerId = {}
  }

  addDevEvent(de) {
    if (de.id in this._alldevEventsPerId) {
      return
    }

    this._alldevEventsPerId[de.id] = de
    this._alldevEvents.push(de)
    this._devEventsPerHour[de.hour].push(de)
  }
  
}

export default Day