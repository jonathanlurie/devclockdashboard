import React from 'react'
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

    const columns = devEvt.map((deArr, i) => {
      const nbDevEvt = deArr.length
      const h = `${nbDevEvt / maxEv}%`

      const bgColor = nbDevEvt > 0 ? {} : {background: 'rgba(0, 0, 0, 0.1)'}
      
      return (
        <div 
        key={i}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.03)',
          }}
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
      
      return (
        <div 
        key={i}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            textAlign: 'center',
          }}
        >
          {`${i}:30`}
        </div>
      )
    })



    return (
      <div className="day-view">
        <div>{day.date}</div>
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