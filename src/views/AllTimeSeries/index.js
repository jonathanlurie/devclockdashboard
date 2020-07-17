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
      labels: allTimeSeries.dateSeries.map((d) => (new Date(d)).toDateString()),
      datasets: [
        {
          label: 'Contributions',
          fill: true,
          lineTension: 0.1,
          borderWidth: 2,
          backgroundColor: 'rgba(21, 161, 255, 0.5)',
          borderColor: 'rgba(21, 161, 255, 1)',
          // borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(21, 161, 255)',
          pointBackgroundColor: 'rgb(21, 161, 255)',
          pointBorderWidth: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(21, 161, 255)',
          pointHoverBorderColor: 'rgb(21, 161, 255)',
          pointHoverBorderWidth: 2,
          pointRadius: 0,
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
      },
      scales: {
        yAxes: [
          {
            gridLines : {
              display : true
            },
            ticks: {
              display: true
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        margin: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
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