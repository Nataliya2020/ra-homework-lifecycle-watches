import React from 'react';
import moment from "moment-timezone";
import PropTypes from 'prop-types';

class Watches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleHour: {transform: `rotate(${this.props.item.timeDeg.hourDeg}deg)`},
      styleMin: {transform: `rotate(${this.props.item.timeDeg.minutDeg}deg)`},
      styleSec: {transform: `rotate(${this.props.item.timeDeg.secondDeg}deg)`},
      hourDeg: '',
      minDeg: '',
      secDeg: '',
      interval: undefined,
    }
  }

  getTimeData = () => {

    let tz = moment.utc().add(`${this.props.item.time.tzH}`, 'hours').add(`${this.props.item.time.tzM}`, 'minutes').format('h:m:s')

    const tzArray = tz.split(':');

    this.setState(() => ({hourDeg: tzArray[0] * 30}));
    this.setState(() => ({minDeg: tzArray[1] * 6}));
    this.setState(() => ({secDeg: tzArray[2] * 6}));
  }

  getDataWatch = () => {
    this.setState(() => ({styleHour: {transform: `rotate(${this.state.hourDeg}deg)`}}));
    this.setState(() => ({styleMin: {transform: `rotate(${this.state.minDeg}deg)`}}));
    this.setState(() => ({styleSec: {transform: `rotate(${this.state.secDeg}deg)`}}));
  }

  timeData = () => {
    this.getTimeData();
    this.getDataWatch()
  }

  componentDidMount() {
    const interval = setInterval(this.timeData, 1000);
    this.setState(() => ({interval: interval}));
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <div className={"container-watch"}>
        <div className={"city"}>{this.props.item.name}</div>
        <div className={"watch"}>
          <div className={"container-hour"}>
            <div className="hour" style={this.state.styleHour}/>
          </div>
          <div className={"container-minute"}>
            <div className="minute" style={this.state.styleMin}/>
          </div>
          <div className={"container-second"}>
            <div className="second" style={this.state.styleSec}/>
          </div>
          <div className={"close"} onClick={() => this.props.handleRemove(this.props.item.id)}>x</div>
        </div>
      </div>
    )
  }
}

Watches.propTypes = {
  item: PropTypes.object,
  handleRemove: PropTypes.func
}

Watches.defaultProps = {
  item: {},
  handleRemove: () => {
  }
}

export default Watches;
