import React from 'react'
import {
  Card,
  Tooltip,
  Row,
  Col,
  Space,
  Tag
} from 'antd'
import {
  ClockCircleOutlined,
  FileFilled,
  BranchesOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import Store from '../../core/Store'
import './style.css'

class DayView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailsDatetime: null,
      allowExpand: 'allowExpand' in props ? !!props.allowExpand : true
    }
  }


  toggleHourDetails = (day, hour) => {
    if (!this.state.allowExpand) {
      return
    }

    if (this.state.detailsDatetime === null) {
      return this.setState({
        detailsDatetime: {
          day: day,
          hour: hour
        }
      })
    }

    if (day === this.state.detailsDatetime.day && hour === this.state.detailsDatetime.hour) {
      return this.setState({
        detailsDatetime: null
      })
    }

    this.setState({
      detailsDatetime: {
        day: day,
        hour: hour
      }
    })

  }

  render() {
    const day = this.props.day
    const devEvt = day.devEventsPerHour
    const maxEv = this.props.max || day.getPeakHour().maxEvents
    const title = this.props.title || (new Date(day.date)).toDateString()

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
      
      const hourPercent = 100 * nbDevEvt / maxEv
      let numberDisplay = null

      if (hourPercent < 10) {
        numberDisplay = (
          <div
            style={{
              marginTop: -25,
              color: '#15a1ff'
            }}
          >
            {nbDevEvt > 0 ? nbDevEvt : null}
          </div>
        )
      } else {
        numberDisplay = (
          <div>
            {nbDevEvt > 0 ? nbDevEvt : null}
          </div>
        )
      }

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
                height: `${hourPercent}%`,
                ...bgColor
              }}
              onClick={(evt) => this.toggleHourDetails(day.date, i)}
            >
              {numberDisplay}
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

    let detailEvents = null

    if (this.state.detailsDatetime) {
      let devEvts = day.getEvents({hour: this.state.detailsDatetime.hour, order: 1})

      const tagColorPerType = {
        CHANGE: 'blue',
        REMOVE: 'red',
        ADD: 'green'
      }

      detailEvents = devEvts.map((de, i) => {
        
        let gitInfo = null

        const extraGitIcon = de.islastBeforeCommit() ? <CloudUploadOutlined /> : null
        const tooltipMessage = de.islastBeforeCommit() ?
          `Commit:\n${de.next.gitLastCommitHash}` :
          `Happened after commit:\n${de.gitLastCommitHash}`

        if (de.gitBranch) {
          gitInfo = (
            <Space>
              <BranchesOutlined />
              <Tooltip title={tooltipMessage}>
                <span style={{color: 'rgb(21, 161, 255)', cursor: 'pointer'}}>{de.gitBranch} {extraGitIcon}</span>
              </Tooltip>
            </Space>
          )
        }

        let versionTag = null
        if (de.hasVersionUpdate()) {
          const versionMessage = `Version update to v${de.packageVersion}`
          versionTag = (
            <Tooltip title={versionMessage}>
              <Tag color="purple">{`v${de.packageVersion}`}</Tag>
            </Tooltip>
          )
        }

        return (
          <Row gutter={16} key={i} style={{marginBottom: 4}}>
            <Col span={3}>
              <Space>
                <ClockCircleOutlined/>
                {de.time}
              </Space>
            </Col>
            <Col span={2}>
              <Tag color={tagColorPerType[de.editType]}>{de.editType}</Tag>
            </Col>

            <Col span={2}>
              {versionTag}
            </Col>

            <Col span={3}>
              {gitInfo}
            </Col>

            <Col>
              <Space>
                <FileFilled />
                {de.filePath}
              </Space>
            </Col>
          </Row>
        )
      })
    }

    const detailTable = <div className="detail-table">{detailEvents}</div>

    return (
      <Card className="day-view" title={title} bordered={false}>
        <div >
          <div className="bar-chart">
            {columns}
          </div>
          <div className="bar-chart-hours">
            {columnsHour}
          </div>
        </div>
        {detailTable}
      </Card>
    )
  }
}

export default DayView