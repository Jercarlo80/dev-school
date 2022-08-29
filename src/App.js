import React, { Component } from 'react';
import './App.css';
import axios
 from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      id_member: "",
      first_name: "",
      last_name: "",
      buttonDisabled: false,
      formStatus: "CREATE",
      memberIdSelected: null
    };
  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=1')
      .then(response => {
        this.setState({ members: response.data.data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  inputOnChangehandler = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
      );
  };

  onSubmitHandler = event => {
    console.log("Your response already sent to our server")
    event.preventDefault();
    this.setState({ buttonDisabled: true });

    // Backend Server
    var payLoad = {
      id_member: this.id,
      first_name: this.first_name,
      last_name: this.last_name
    };

    var url = "";
    if (this.state.formStatus === "create") {
      url = "https://reqres.in/api/users";
      this.addMember(url, payLoad);
    } else {
      url = 'https://reqres.in/api/users/${this.state.memberIdSelected}';
      this.editMember(url, payLoad);
    }
  };

  addMember = (url, payLoad) => {
    axios.post(url, payLoad)
      .then(response => {
        console.log(response);
        var members = [...this.state.members]
        members.push(response.data)
        this.setState(
          { 
            members, 
            buttonDisabled: false,
            id_member: "",
            first_name: "",
            last_name: "" 
          })
      })
      .catch(error => {
        console.log(error);
      });
  };

  editMember = (url, payLoad) => {
    axios.put(url, payLoad)
      .then(response => {
        var members = [...this.state.members]
        var indexmember = members.findIndex(
          member => member.id === this.state.memberIdSelected
          )

        members[indexmember].id = response.data.id;
        members[indexmember].first_name = response.data.first_name;
        members[indexmember].last_name = response.data.last_name;
        
        this.setState(
          {
          members,
          buttonDisabled: false,
          id: "",
          first_name: "",
          last_name: "",
          formStatus: "create"
        })
      }).catch(error => {
        console.log(error);
      });
  }

  editButtonHandler = member => {
    this.setState(
      {
      id_member: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      formStatus: "EDIT",
      memberIdSelected: member.id_member
      })
  }

  render() {
    return (
      <div className="container">
        <h1>Stark Industries DevSchool</h1>
        <div className='row'>
          <div className='col-md-6' style={{border: '1px solid black'}}>

            <h2>MEMBER</h2>
            <div className='row'>
            {this.state.members.map((member, index) => 
              <div className='col-md-6' key={member.id}>
              <div className='card' style={{margin: 10}}>
                <div className='card-body'>
                  <h5 className='card-title'>
                    ID MEMBER: {member.id}
                  </h5>
                  <h5 className='card-title'>
                    FIRST NAME: {member.first_name}
                  </h5>
                  <h5 className='card-title'>
                    LAST NAME:  {member.last_name}
                  </h5>
                  <button className='btn btn-primary' onClick={() => this.editButtonHandler(member)}>EDIT</button>
                  <button className='btn btn-danger'>DELETE</button>
                </div>
              </div>
            </div>
            )};
            </div>
          </div>
          <div className='col-md-6' style={{border: '1px solid black'}}>

            <h2>FORM {this.state.formStatus}</h2>
            <form onSubmit={this.onSubmitHandler}>
              <div className='form-group'>
                {/* <label>ID MEMBER: </label>
                <input 
                type='text' className='form-control' 
                name='id_member' 
                value={this.state.id_member}
                onChange={this.inputOnChangehandler}
                />  */}
                <label>FIRST NAME: </label>
                <input 
                type='text' 
                className='form-control' 
                name='first_name'  
                value={this.state.first_name}
                onChange={this.inputOnChangehandler}
                /> 
                <label>LAST NAME: </label>
                <input 
                type='text' 
                className='form-control' 
                name='last_name' 
                value={this.state.last_name}
                onChange={this.inputOnChangehandler}
                /> 
                <button 
                type='SUBMIT' 
                className='btn btn-primary'
                disabled={this.state.buttonDisabled} // menonaktifkan button kita user sudah melakukan klik.
                >
                SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
