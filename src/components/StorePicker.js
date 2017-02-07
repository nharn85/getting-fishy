import React from 'react';
// import { getFunName } from '../helpers';

import {getFunName} from '../helpers';

class StorePicker extends React.Component {
  constructor(){
    super();
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(e){
    e.preventDefault();
    // First grab text from box
    const storeId = this.storeInput.value;

    //Second transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    // Regular JS comment
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        { /* JSX Comment */ }
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
        <button type="submit">Visit Store →</button>
      </form>

    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;