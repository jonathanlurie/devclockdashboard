import Store from './Store'
import DevEvent from './DevEvent'
import DayCollection from './DayCollection'


async function devclockLogReader() {

  // get it from store or create it
  let dayCollection = null
  if(Store.has('dayCollection')) {
    dayCollection = Store.get('dayCollection')
  } else {
    dayCollection = new DayCollection()
  }

  // loading the devclock log file
  const dclRes = await fetch('./devclocklog.tsv')
  const dclRaw = await dclRes.text()
  
  dclRaw.split('\n')
  .map((s) => s.trim())
  .filter((s) => s.length > 0)
  .filter((s) => !s.startsWith('#'))
  .map((s) => new DevEvent(s))
  .forEach((de) => {
    dayCollection.addDevEvent(de)
  })

  // if it's the first time, adding to store,
  // if not, let's do it to trigger the event
  Store.set('dayCollection', dayCollection)
}

export default devclockLogReader