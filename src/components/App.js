import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    //Commented out since we can use a new JS feature not out yet
    // this.addFish = this.addFish.bind(this);
    // this.updateFish = this.updateFish.bind(this);
    // this.removeFish = this.removeFish.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    // this.addToOrder = this.addToOrder.bind(this);
    // this.removeFromOrder = this.removeFromOrder.bind(this);

    // Inital state
    // getIntalState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount(){
    // This runs right before the <App /> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
  }

  addFish = (fish) => {
    //update state
    // this take a copy of the current state
    const fishes = {...this.state.fishes};
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  removeFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = (key) => {
    //get copy of state
    const order = {...this.state.order};
    //update or add new number of fish order
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    //get copy of state
    const order = {...this.state.order};
    //remove entry
    delete order[key];
    // update state
    this.setState({ order });
  };

  render() {
    // Regular JS comment
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          loadSamples={this.loadSamples}
          addFish={this.addFish}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;