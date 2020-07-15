import React from 'react'
import { Card } from 'antd'
import Store from '../../core/Store'
import {Line} from 'react-chartjs-2'
import './style.css'

class AllTimeSeries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    const dayCollection = Store.get('dayCollection')
    const allTimeSeries = dayCollection.getDevEventsPerDaySeries()

    const data = {
      labels: allTimeSeries.dateSeries,
      datasets: [
        {
          label: 'Contributions',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgb(21, 161, 255)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(21, 161, 255)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(21, 161, 255)',
          pointHoverBorderColor: 'rgb(21, 161, 255)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: allTimeSeries.contributionSeries,
        }
      ]
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        cornerRadius: 2,
      }
    }

    return (
      <Card className="all-time-series" title="All time contributions" bordered={false}>
        <Line data={data} options={options} height={300} className='blabla'/>
      </Card>
    )

  }

}

export default AllTimeSeries