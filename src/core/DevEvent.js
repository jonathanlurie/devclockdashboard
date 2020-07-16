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
    this._gitBranch = null
    this._gitLastCommitHash = null

    if (elem[7] !== 'null') {
      const gitBranchAndHash = elem[7].split('/')
      this._gitBranch = gitBranchAndHash[0]
      this._gitLastCommitHash = gitBranchAndHash[1]
    }

    this._previousDevEvent = null
    this._nextDevEvent = null
  }


  get previous() {
    return this._previousDevEvent
  }


  get next() {
    return this._nextDevEvent
  }


  set previous(prevDe) {
    this._previousDevEvent = prevDe
  } 


  set next(nextDe) {
    this._nextDevEvent = nextDe
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


  get gitLastCommitHash() {
    return this._gitLastCommitHash
  }


  get gitBranch() {
    return this._gitBranch
  }


  hasVersionUpdate() {
    if (!this._previousDevEvent) {
      return false
    }

    return this._previousDevEvent.packageVersion !== this._packageVersion
  }


  /**
   * If true, then this event is the one jsut before a git commit,
   * meaning that the next dev event happened just after this commit.
   * 
   */
  islastBeforeCommit() {
    // there is no nrxt event
    if (!this._nextDevEvent) {
      return false
    }

    // not using git (probably)
    if (!this._gitLastCommitHash || !this._nextDevEvent.gitLastCommitHash) {
      return false
    }

    return this._gitLastCommitHash !== this._nextDevEvent.gitLastCommitHash
  }
}

export default DevEvent