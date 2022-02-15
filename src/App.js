import React from 'react';
import './App.css';
import EnterTime from './components/EnterTime';
import ShowWatches from './components/ShowWatches'

class App extends React.Component {
  state = {
    switch: false,
    watchElems: []
  };

  handleSwitch = switchFlag => {
    this.setState(() => ({switch: switchFlag}));
  }

  handlerAdd = (watch) => {
    this.setState({
      watchElems: [...this.state.watchElems].concat(watch)
    })
  }

  handleRemove = id => {
    this.setState(() => ({watchElems: this.state.watchElems.filter(elem => elem.id !== id)}))
  }

  render() {
    return (
      <div className={"container"}>
        <EnterTime handleSwitch={this.handleSwitch} handlerAdd={this.handlerAdd}/>

        <div className={"container-watches"}>
          {this.state.switch && <ShowWatches watches={this.state.watchElems} del={this.handleRemove}/>}
        </div>
      </div>
    )
  }
}

export default App;
