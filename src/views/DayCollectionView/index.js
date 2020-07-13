import React from 'react'
import Store from '../../core/Store'
import DayView from '../DayView'
import './style.css'



class DayCollectionView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: -1,
    }
  }

  render() {
    const dayCollection = Store.get('dayCollection')
    const availableDays = dayCollection.getAvailableDays(this.state.order)
    const maxEv = dayCollection.getPeakHour().maxEvents

    const dayViews = availableDays.map((day, i) => {
      return (
        <DayView day={day} max={maxEv} key={i}/>
      )
      
    })

    return (
      <div className="day-collection-view">
        {dayViews}
      </div>
    )


  }
}

export default DayCollectionView