import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [{}, {}, {}, {}]
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Stark Industries DevSchool</h1>
        <div className='row'>
          <div className='col-md-6' style={{border: '1px solid black'}}>

            <h2>Member</h2>
            <div className='row'>
            {this.state.members.map((member, index) => 
              <div className='col-md-6'>
              <div className='card' style={{margin: 10}}>
                <div className='card-body'>
                  <h5 className='card-title'>
                    ID MEMBER: 
                  </h5>
                  <h5 className='card-title'>
                    FIRST NAME: 
                  </h5>
                  <h5 className='card-title'>
                    LAST NAME:  
                  </h5>
                  <button className='btn btn-primary'>EDIT</button>
                  <button className='btn btn-danger'>DELETE</button>
                </div>
              </div>
            </div>
            )};
            </div>
          </div>
          <div className='col-md-6' style={{border: '1px solid black'}}>

            <h2>Form</h2>
            <form>
              <div className='form-group'>
                <label>ID MEMBER: </label>
                <input type='text' className='form-control'/> 
                <label>FIRST NAME: </label>
                <input type='text' className='form-control'/> 
                <label>LAST NAME: </label>
                <input type='text' className='form-control'/> 
                <button type='SUBMIT' className='btn btn-primary'>SUBMIT</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
