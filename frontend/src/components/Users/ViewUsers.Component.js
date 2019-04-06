import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button, Alert } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import {ViewData} from '../Data/ViewData.Component';
import {AddData} from '../Data/AddData.Component';
import { SignUp } from '../Login/SignUp.Component';


export class ViewUsers extends React.Component {
  constructor(props) {
    super(props);
  }
  // initialize our state 
  state = {
    data: [],
    id: 0,
    admin: "all",
    logoutProp: this.props.func,
    itemId: null,
    updateToApply: null,
    updateToPasswordApply: null,
    updateToField: null,
    updateCurrent: null,
    alertMsg: {
      color: "danger",
      message: null,
    },
    project: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    isLoading: true,
    viewUser: false,
    viewUsers: false,
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
    const editBoxHeading = document.getElementById("editBoxHeading");
    const viewBoxHeading = document.getElementById("viewBoxHeading");

    const editBox = document.getElementById("editBox");
    const viewBox = document.getElementById("viewBox");

    const editBox1 = document.getElementById("editBox1");
    const viewBox1 = document.getElementById("viewBox1");

    const editBox2 = document.getElementById("editBox2");
    const viewBox2 = document.getElementById("viewBox2");

    const editBox3 = document.getElementById("editBox3");
    const viewBox3 = document.getElementById("viewBox3");

    const editBoxPassword = document.getElementById("editBoxPassword");
    const viewBoxPassword = document.getElementById("viewBoxPassword");

    const editBox4 = document.getElementById("editBox4");
    const viewBox4 = document.getElementById("viewBox4");

    console.log(id);
    const updateToApply = this.state.updateToApply;
    const updateCurrent = this.state.updateCurrent;
    const updateToField = this.state.updateToField;

    if(num === 1) {

      viewBox.style.display = "none";
      editBox.style.display = "flex";
      
    }
    if(num === 2) {
      editBox.style.display = "none";
      viewBox.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 11) {

      viewBox1.style.display = "none";
      editBox1.style.display = "flex"; 
    }
    if(num === 12) {
      editBox1.style.display = "none";
      viewBox1.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 21) {

      viewBox2.style.display = "none";
      editBox2.style.display = "flex"; 
    }
    if(num === 22) {
      editBox2.style.display = "none";
      viewBox2.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 31) {

      viewBox3.style.display = "none";
      editBox3.style.display = "flex";
    }
    if(num === 32) {
      editBox3.style.display = "none";
      viewBox3.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 41) {

      viewBoxHeading.style.display = "none";
      editBoxHeading.style.display = "flex"; 
    }
    if(num === 42) {
      editBoxHeading.style.display = "none";
      viewBoxHeading.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 51) {

      viewBoxPassword.style.display = "none";
      editBoxPassword.style.display = "flex";
    }
    if(num === 52) {
      editBoxPassword.style.display = "none";
      viewBoxPassword.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 61) {
      viewBox4.style.display = "none";
      editBox4.style.display = "flex";
      
    }
    if(num === 62) {
      editBox4.style.display = "none";
      viewBox4.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    
  }

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (
    idToUpdate, 
    updateToApply,
    updateCurrent,
    updateToField
    ) => {
    this.setState({
      isLoading: true,
    })
    let update = null;
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat._id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });
    
    console.log(objIdToUpdate, updateCurrent, updateToApply, updateToField)
    axios.post("http://localhost:3001/api/account/updateData", {
      headers: {
        'Content-Type': 'application/json'
      },
      id: objIdToUpdate,
      current: updateCurrent,
      update: updateToApply,
      field: updateToField,
    })   
    .then(response => { 
      console.log(response)
      this.state.alertMsg = response.data;
    })
    .catch(error => {
        console.log(error.response)
    });
    if(this.state.alertMsg.success === "true") {
      this.setState({
        alertMsg: {color: "success"},
        isLoading: false
      })
      console.log("true")
    } else {
      this.setState({
        alertMsg: {color: "danger"},
        isLoading: false
      })
      console.log("false")
  }
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

  authorized = () => {
    const userAccess = JSON.parse(localStorage.getItem('user_access'));
    if(userAccess === "admin") {
        this.setState({admin: 'admin'})
        this.viewUsers();
    } else {
        this.setState({admin: 'all'});
        const userId = JSON.parse(localStorage.getItem('user_id'));
        this.viewUser(userId);
    }
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
      userId,
      alertMsg,
      admin
    } = this.state;

    if(isLoading) {
      return(
        <div>
          <FeatherIcon icon="loading"/>
          {this.authorized()}
        </div>
      );
    }

    

    if(!isLoading && viewUsers) {
      return (
        <div className="row">
          <div className="col-md-9">
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
          <div className="col-md-3">
              <SignUp />
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
              <div key={data._id} className="row">
              <div className="viewUser col-md-9">
              {
                (alertMsg.message) ? (
                  <Alert color="danger" style={{ marginTop: '10px' }}>
                    {alertMsg.message}
                  </Alert>
                ) : (null)
              }       
              {
                this.state.admin === "admin"
                ? <a
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
                : <> </>
              }   


              <div className="viewUserHeading">
                  
              <div id="viewBoxHeading" className="viewUserContactView">
                <div
                  onClick={() => this.editUser(data._id, 41)}
                  className="viewUserContactViewLink"
                >
                  <h2 className="viewUserContactViewData">{data.company}</h2>
                  <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                </div>
              </div>
              <div id="editBoxHeading" className="viewUserContactEdit">
                  <Input 
                    type="text"
                    onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.company, updateToField: "company" })}
                    placeholder={data.company}
                  >         
                  </Input>
                  <FeatherIcon 
                    color="success" 
                    className="viewUserContactCheck" 
                    icon="check"
                    onClick={() => this.editUser(data._id, 42)} 
                  />
                </div>
                  
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
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.firstName, updateToField: "firstName" })}
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
                        
                        <div id="viewBox1" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data._id, 11)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.lastName}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox1" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.lastName, updateToField: "lastName" })}
                            placeholder={data.lastName}
                          >            
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 12)} 
                          />
                        </div>
                        
                      </div>
                      <div className="col">
                        <div id="viewBox2" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data._id, 21)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.email}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox2" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.email, updateToField: "email" })}
                            placeholder={data.email}
                          >            
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 22)} 
                          />
                        </div>

                        <div id="viewBox3" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data._id, 31)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.access}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox3" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.access, updateToField: "access" })}
                            placeholder={data.access}
                          >    
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 32)} 
                          />
                        </div>

                    </div>
                  </div>
              </div>
            
              {/* User project */}
            
              <div className="row">
                <div className="col">
                    <ViewData id={data._id} type="project"/>
                </div>
              </div>
              </div>
              <div className="col-md-3">
              <div id="viewBoxPassword" className="viewUserButton">
                  <Button color="dark" onClick={() => this.editUser(data._id, 51)}>Change Password</Button>
                </div>
                <div id="editBoxPassword" className="viewUserContactEdit">
                  <Input 
                      type="text"
                      onChange={e => this.setState({ updateToPasswordApply: e.target.value})}
                      placeholder="Current Password"
                    >    
                    </Input>
                    <Input 
                      type="text"
                      onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.password, updateToField: "password" })}
                      placeholder="New Password"
                    >    
                    </Input>
                    <FeatherIcon 
                      color="success" 
                      className="viewUserContactCheck" 
                      icon="check"
                      onClick={() => this.editUser(data._id, 52)} 
                    />
                    
                  </div>
                <AddData parent={data} />  
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
