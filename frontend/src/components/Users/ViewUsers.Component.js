import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';


export class ViewUsers extends React.Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    itemId: null,
    updateToApply: null,
    upDateField: null,
    // company: null,
    // firstName: null,
    // lastName: null,
    // email: null,
    // password: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    isLoading: false,
    viewUser: false,
    viewUsers: true,
    userId: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("http://localhost:3001/api/account/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
      // console.table(this.state.data);
  };

  // our put method that uses our backend api
  // to create new query into our database
  putDataToDB = (
    taskName, 
    taskDesc, 
    taskUser, 
    taskHours, 
    taskDueDate
    ) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      taskName: taskName,
      taskDesc: taskDesc,
      taskUser: taskUser,
      taskHours: taskHours,
      taskDueDate: taskDueDate
    })
    .then(response => { 
      console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });
  };


  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };
  editUser = (id, num) => {
    const editBox = document.getElementById("editBox");
    const viewBox = document.getElementById("viewBox");
    console.log(id);
    const updateToApply = this.state.updateToApply;
    const updateToField = this.state.updateToField;

    if(num === 1) {
      viewBox.style.display = "none";
      editBox.style.display = "flex";
      
    }
    if(num === 2) {
      editBox.style.display = "none";
      viewBox.style.display = "block";
      const update = this.state.update;
      this.updateDB(id, updateToApply, updateToField);
    }
    
  }

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (
    idToUpdate, 
    updateToApply,
    updateToField
    ) => {
    
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat._id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });
    console.log(idToUpdate);
    axios.post("http://localhost:3001/api/account/updateData", {
      headers: {
        'Content-Type': 'application/json'
      },
      id: objIdToUpdate,
      firstName: updateToApply
      
      
    })   
    .then(response => { 
      console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });

  };
  viewUser(id) {
    this.setState({
      isLoading: false,
      viewUsers: false,
      viewUser: true,
      userId: id
    })
    console.log(this.state.userId);
  }
  viewUsers = () => {
    this.setState({
      isLoading: false,
      viewUser: false,
      viewUsers: true,
      userId: null
    })
  }


  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
      

    const { 
      data,
      isLoading,
      viewUser,
      viewUsers,
      userId
    } = this.state;

    if(isLoading) {
      return(
        <FeatherIcon icon="loading"/>
      );
    }
    if(!isLoading && viewUsers) {
      return (
        <div className="col">
          <h2>User</h2>
          <div>
            <table className="table table-striped table-sm">
              <thead>
                  <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Contact Email</th>
                    <th>Privileges</th>
                  </tr>
              </thead>
              <tbody key={data.taskName}>
                  {data.length <= 0
                  ? "NO DB ENTRIES YET"
                  : data.map(data => (
                      <tr key={data._id} className="fade-in" onClick={() => this.viewUser(data._id)}>
                        <td>{data.company}</td>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.email}</td>
                        <td>{data.access}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
      </div>
      );
    }
    if(!isLoading && viewUser) {
      return(
        <div>  
          {
            data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.filter(data => data._id === userId).map(data => (
              <div key={data._id} className="viewUser">
              <a
              onClick={this.viewUsers}
              className="viewUserBackLink"
              >
              <p> 
                <FeatherIcon 
                  icon="arrow-left" 
                  className="viewUserBackIcon"
                />
              Back
              </p>
              </a>
              <div className="viewUserHeading">
                  
                  
                  <h2>{data.company}</h2>
              </div>
              <div className="viewUserContact">
                  <h3>Contact</h3>
                  <div className="row">
                    <div className="col">
                    <div id="viewBox" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data._id, 1)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.firstName}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox" className="viewUserContactEdit">
                          <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, upDateField: "firstName" })}
                            placeholder={data.firstName}
                          >         
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 2)} 
                          />
                        </div>
                      <p>Email Address: <span className="viewUserContactData">{data.email}</span></p>

                    </div>
                    <div className="col">
                      <p>Last Name: <span className="viewUserContactData">{data.lastName}</span></p>
                      <p>Account Privileges: <span className="viewUserContactData">{data.access}</span></p>
                    </div>
                  </div>
              </div>
            </div>
            ))
          }
        </div>
      );
    }

  }
}

export default ViewUsers;
