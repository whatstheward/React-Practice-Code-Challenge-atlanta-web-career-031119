import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state={
      allSushi: [],
      sushiIndex: 0,
      budget: 100
    }
  }

  componentDidMount(){
    fetch(API)
    .then(res => res.json())
    .then(sushiData => {
      
      let newSushis = sushiData.map(sushi=>{
        return {
          ...sushi, eaten: false
        }
      })
      this.setState({allSushi: newSushis})
  })
}

  handleMoreSushi = () =>{
    this.setState({sushiIndex: this.state.sushiIndex + 4})
  }

  eatSushi = (sushiObject) => {
    const eatenSushis = this.state.allSushi.map(sushi=> {
      if(sushi.id === sushiObject.id && sushiObject.price < this.state.budget){
        sushi.eaten = true
        this.setState({budget: this.state.budget - sushiObject.price})
        return sushi
      }else{
      return sushi}
    })
    this.setState({allSushi: eatenSushis})
  }

  sushiSlicer(){
    let fourSushi = this.state.allSushi.slice(this.state.sushiIndex, this.state.sushiIndex+4)
    return fourSushi
  }

  filterEatenSushi(){
    return this.state.allSushi.filter(sushi=> sushi.eaten)
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.sushiSlicer()} handleMoreSushi={this.handleMoreSushi} eatSushi={this.eatSushi}  />
        <Table budget={this.state.budget} eatenSushis={this.filterEatenSushi()} />
      </div>
    );
  }
}

export default App;