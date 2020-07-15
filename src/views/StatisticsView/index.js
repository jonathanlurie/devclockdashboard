import React from 'react'
import Store from '../../core/Store'
import DayView from '../DayView'
import AllTimeSeries from '../AllTimeSeries'
import './style.css'



class StatisticsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const dayCollection = Store.get('dayCollection')
  
    return (
      <div className="statistics-view">
        <AllTimeSeries/>
        <DayView day={dayCollection.getTotalDay()} title="All time per hour" allowExpand={false}/>
      </div>
    )


  }
}

export default StatisticsView