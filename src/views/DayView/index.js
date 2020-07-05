import React from 'react'

class DayView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }


  render() {
    const day = this.props.day

    return (
      <div>
        {day.date}
      </div>
    )
  }
}

export default DayView