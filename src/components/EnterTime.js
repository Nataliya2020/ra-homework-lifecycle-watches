import React from 'react';
import Tooltip from './Tooltip'
import moment from "moment-timezone";
import {v4 as uuid} from "uuid";
import PropTypes from 'prop-types';

class EnterTime extends React.Component {

  state = {
    errorInputTime: false,
    errorInputName: false,
    errorInputTz: false,
    errorInputTzTime: false,
    city: '',
    time: '',
  }

  minTz = '';
  hourTz = '';
  indexTz = '';

  handlerCity = (evt) => {
    this.setState(() => ({errorInputName: false}));

    if (evt.keyCode === 13) {
      evt.preventDefault();
    }

    this.setState(() => ({city: evt.target.value}));
  }

  handlerTime = (evt) => {
    this.setState(() => ({errorInputTzTime: false}));
    this.setState(() => ({errorInputTz: false}));
    this.setState(() => ({errorInputTime: false}));

    if (evt.keyCode === 13) {
      evt.preventDefault();
    }

    if (!/^[-+]?([0-9]{1,2})?[:]?([0-9]{1,2})?$/.test(evt.target.value) && evt.target.value !== '') {
      this.setState(() => ({errorInputTime: true}));
      return;
    } else {
      this.setState(() => ({errorInputTime: false}));
    }

    this.setState(() => ({
      time: evt.target.value
    }));
  }

  submitData = (evt) => {

    this.setState(() => ({errorInputName: false}));
    this.setState(() => ({errorInputTz: false}));

    evt.preventDefault();

    if (this.state.city.trim() === '') {
      this.setState(() => ({errorInputName: true}));
      return;
    }

    if (this.state.time.trim() === '') {
      this.setState(() => ({errorInputTzTime: false}));
      this.setState(() => ({errorInputTime: false}));
      this.setState(() => ({errorInputTz: true}));
      return;
    } else {
      this.setState(() => ({errorInputTz: false}));
    }

    if (this.state.time.includes(':')) {
      this.indexTz = this.state.time.indexOf(':');
      this.hourTz = this.state.time.slice(0, +this.indexTz);
      this.minTz = this.state.time.slice(+this.indexTz + 1);
    } else if ((+this.state.time ^ 0) === +this.state.time) {
      this.hourTz = this.state.time;
      this.minTz = ':00'
    }

    if ((+this.hourTz > 12) || (+this.hourTz < -12)) {
      this.setState(() => ({errorInputTime: false}));
      this.setState(() => ({errorInputTz: false}));
      this.setState(() => ({errorInputTzTime: true}));
      return;
    }

    this.setState(() => ({city: ''}));

    this.setState(() => ({time: ''}));

    let tz = moment.utc().add(`${this.hourTz}`, 'hours').add(`${this.minTz}`, 'minutes').format('h:m:s');
    const tzArray = tz.split(':');
    const hourDeg = tzArray[0] * 30;
    const minDeg = tzArray[1] * 6;
    const secDeg = tzArray[2] * 6;

    const elemWatch = {
      name: this.state.city,
      id: uuid(),
      time: {
        tzH: this.hourTz,
        tzM: this.minTz
      },
      timeDeg:
        {
          hourDeg: hourDeg,
          minutDeg: minDeg,
          secondDeg: secDeg,
        }
    }

    this.props.handlerAdd(elemWatch);
    this.props.handleSwitch(true);
  }

  render() {
    return (
      <form className="form-enter-time" onSubmit={this.submitData}>
        <label className={"label-name"}>
          <span className={"span-display"}> Название</span>
          <input className={"input-enter-time"} type="text" name={"city"} value={this.state.city}
                 onChange={this.handlerCity}/>
          {this.state.errorInputName && <Tooltip errorMessage={"Введите название города"}/>}
        </label>

        <label className={"label-time"}>
          <span className={"span-display"}> Временная зона</span>
          <input className={"input-enter-time"} type="text" value={this.state.time} onChange={this.handlerTime}/>
          {this.state.errorInputTime && <Tooltip errorMessage={"Вводите только цифры. Пример ввода: 4 или 4:30"}/>}
          {this.state.errorInputTz && <Tooltip errorMessage={"Введите данные.Пример ввода: 4 или 4:30"}/>}
          {this.state.errorInputTzTime && <Tooltip errorMessage={"Введите корректные данные"}/>}
        </label>

        <button className="button" type={"submit"}>Добавить</button>
      </form>
    )
  }
}

EnterTime.propTypes = {
  handleSwitch: PropTypes.func,
  handlerAdd: PropTypes.func
};

EnterTime.defaultProps = {
  handleSwitch: () => {
  },
  handlerAdd: () => {
  }
};


export default EnterTime;
