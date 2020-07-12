import React from 'react'
import { Card, Tooltip } from 'antd'
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
      
      const editTypesCounter = {}
      deArr.forEach((de) => {
        if (!(de.editType in editTypesCounter)) {
          editTypesCounter[de.editType] = 0
        }
        editTypesCounter[de.editType] += 1
      })


      const editTypeTooltipInfo = Object.keys(editTypesCounter)
        .map((editType) => `• ${editTypesCounter[editType]} ${editType}(s)`)
        .join('\n')



      const hourDisplay = i % 12
      const ampm = i < 12 ? 'am' : 'pm'
      const tooltipText = `In the hour starting at ${hourDisplay}${ampm}, there was:\n${editTypeTooltipInfo}`

      console.log('deArr', deArr)
      
      return (
        
        <div 
          key={i}
          className="bar-container"
        >
          <Tooltip title={tooltipText} key={i}>
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
          </Tooltip>
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
            {i}h
          </div>
      )
    })

    return (
      <Card title={dateString} bordered={false}>
        <div className="day-view">
          <div className="bar-chart">
            {columns}
          </div>
          <div className="bar-chart-hours">
            {columnsHour}
          </div>
          
        </div>
      </Card>
    )
  }
}

export default DayView