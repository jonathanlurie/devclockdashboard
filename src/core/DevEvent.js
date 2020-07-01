/*
A dev event is a line in the devclocklog.tsv file:

# edit_id	timestamp	iso8601	package_name	package_version	filepath	edit_type
8zlm0rJgG	1593552524060	2020-06-30T23:28:44+02:00	devclockdashboard	0.1.0	src/App.js	CHANGE

*/


class DevEvent {
  constructor(strDevEvt) {
    const elem = strDevEvt.trim().split('\t')
    this._editId = elem[0]
    this._timestamp = elem[1]
    this._iso8601 = elem[2]
    this._packageName = elem[3]
    this._packageVersion = elem[4]
    this._filePath = elem[5]
    this._editType = elem[6]
  }


  get timestamp() {
    return this._timestamp
  }


  get id() {
    return this._editId
  }


  get isoDate() {
    return this._iso8601
  }


  get packageName() {
    return this._packageName
  }


  get packageVersion() {
    return this._packageVersion
  }


  get filePath() {
    return this._filePath
  }


  get editType() {
    return this._editType
  }


  get date() {
    return this._iso8601.split('T')[0]
  }


  get year() {
    const date = this.date
    return parseInt(date.split('-')[0])
  }


  get month() {
    const date = this.date
    return parseInt(date.split('-')[1])
  }


  get day() {
    const date = this.date
    return parseInt(date.split('-')[2])
  }


  get timeWithTimezone() {
    return this._iso8601.split('T').pop()
  }


  get time() {
    return this._iso8601.split('T').pop().slice(0, 8)
  }


  get hour() {
    const t = this.time
    return parseInt(t.split(':')[0])
  }


  get minute() {
    const t = this.time
    return parseInt(t.split(':')[1])
  }


  get second() {
    const t = this.time
    return parseInt(t.split(':')[2])
  }


  get timezone() {
    const ttz = this.timeWithTimezone
    if (ttz.endsWith('Z')) {
      return '00:00'
    }
    return ttz.slice(8)
  }


  get timezoneDecimal() {
    const tz = this.timezone
    const elem = tz.split(':')
    return parseInt(elem[0]) + parseInt(elem[1]) / 60
  }

}

export default DevEvent