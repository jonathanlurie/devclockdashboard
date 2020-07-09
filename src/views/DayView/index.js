import React from 'react'
import Chip from '@material-ui/core/Chip';
import TodayIcon from '@material-ui/icons/Today';
import Store from '../../core/Store'
import './style.css'

class DayView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }


  render() {
    const day = this.props.day
    const devEvt = day.devEventsPerHour
    const dayCollection = Store.get('dayCollection')
    const maxEv = dayCollection.getPeakHour().maxEvents
    const dateString = (new Date(day.date)).toDateString()

    const columns = devEvt.map((deArr, i) => {
      const nbDevEvt = deArr.length
      const h = `${nbDevEvt / maxEv}%`
      const bgColor = nbDevEvt > 0 ? {} : {background: 'rgba(0, 0, 0, 0.1)'}
      
      return (
        <div 
          key={i}
          className="bar-container"
        >
          <div 
            className="bar"
            date={day.date}
            hour={i}
            style={{
              height: `${100 * nbDevEvt / maxEv}%`,
              ...bgColor
            }}
          >
            {nbDevEvt > 0 ? nbDevEvt : null}
          </div>
        </div>
      )
    })


    const columnsHour = devEvt.map((deArr, i) => {
      const hourDisplay = i % 12
      const ampm = i < 12 ? 'am' : 'pm'
      return (
        <div 
          key={i}
          className="hour-label"
        >
          {`${hourDisplay}${ampm}`}
        </div>
      )
    })



    return (
      <div className="day-view">
        <div
          className="date-display"
        >
          <Chip
            icon={<TodayIcon />}
            label={dateString}
            color="red"
          />
        </div>
        <div className="bar-chart">
          {columns}
        </div>
        <div className="bar-chart-hours">
          {columnsHour}
        </div>
        
      </div>
    )
  }
}

export default DayView