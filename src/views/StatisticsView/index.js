import React from 'react'
import Store from '../../core/Store'
import DayView from '../DayView'
import AllTimeSeries from '../AllTimeSeries'
import { Row, Col, Statistic } from 'antd'
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

        {/* <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Active Users" value={112893} />
          </Col>
          <Col span={12}>
            <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
          </Col>
        </Row> */}


        <AllTimeSeries/>
        <DayView day={dayCollection.getTotalDay()} title="All time per hour" allowExpand={false}/>
      </div>
    )


  }
}

export default StatisticsView