import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button, Alert } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import AddProject from './AddProject.Component';

export class ViewProjects extends React.Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    admin: "all",
    itemId: null,
    taskName: null,
    taskDesc: null,
    taskProject: null,
    taskHours: null,
    taskDueDate: null,
    alertMsg: {
      color: "danger",
      message: null,
    },
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    isLoading: false,
    viewProject: false,
    viewProjects: true,
    projectId: null
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
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our database
  putDataToDB = (
    taskName, 
    taskDesc, 
    taskProject, 
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
      taskProject: taskProject,
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



  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat.id;
      }
    });
    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


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
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat.id;
      }
    });

    console.log(objIdToUpdate, updateCurrent, updateToApply, updateToField)
    axios.post("http://localhost:3001/api/updateData", {
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
  viewProject(id) {
    this.setState({
      isLoading: false,
      viewProjects: false,
      viewProject: true,
      projectId: id
    })
    
  }
  viewProjects = () => {
    this.setState({
      isLoading: false,
      viewProject: false,
      viewProjects: true,
      projectId: null
    })
  }


  authorized = () => {
    const userAccess = JSON.parse(localStorage.getItem('user_access'));
    if(userAccess === "admin") {
        this.state.admin = 'admin';
        this.viewProjects();
    } else {
        this.state.admin = 'all';
        const userId = JSON.parse(localStorage.getItem('user_id'));
        this.state.userId = userId;
    }
 }

  loading() {
    return(
      <div className="loading">
        <FeatherIcon className="loadingIcon" icon="loader" size="54" />
        {this.authorized()}
      </div>
    );
  }

  userProjects(id) {
    this.state.isLoading = false;
    this.state.title = "Projects";
    const { data, projectId } = this.state;
    if(this.state.viewProjects = true){
      return(
        <tbody>
        {
          data.length <= 0
          ? <FeatherIcon icon="loading"/>
          : data.filter(data => data.taskProject === id).map(data => (

                  <tr key={data.id} className="fade-in" onClick={() => this.viewProject(data.id)}>
                    <td>{data.taskName}</td>
                    <td>{data.taskProject}</td>
                    <td>{data.taskHours}</td>
                    <td>{data.taskDueDate}</td>
                  </tr>
                ))
              }
        </tbody>
      );  
      }
      if(this.state.viewProject = true) {
        return(
        <div>  
          {
            data.length <= 0
            ? <FeatherIcon icon="loading"/>
            : data.filter(data => data.id === id).map(data => (
              <div key={data.id} className="viewData">
              <a
              onClick={this.viewDatas}
              className="viewDataBackLink"
              >
              <p> 
                <FeatherIcon 
                  icon="arrow-left" 
                  className="viewDataBackIcon"
                />
              Back
              </p>
              </a>
              <div className="viewDataHeading">
                  
                  <p>{data.id}</p>
                  <h2>{data.taskName}</h2>
              </div>
                  {data.taskDesc}
                  {data.taskData}
                  {data.taskHours}
                  {data.taskDueDate}
              </div>
            ))
          }
        </div>
        );
      }
  }



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { 
      data,
      isLoading,
      viewProject,
      viewProjects,
      projectId,
      alertMsg,
      userId,
      admin
    } = this.state;
    if(isLoading) {
      return this.loading();
    }
    if(!isLoading && viewProjects) {
      return (
        <div className="row">
          <div className="col-md-9">
            <div>
              <table className="table table-striped table-sm">
                <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Company</th>
                      <th>Hours Logged</th>
                      <th>Due Date</th>
                    </tr>
                </thead>

                    {
                      this.state.admin === "admin"
                      ? this.userProjects()
                      : data.length <= 0
                        ? "NO DB ENTRIES YET"
                        : data.map(data => (
                          <tbody key={data.taskName}>
                          <tr key={data.id} className="fade-in" onClick={() => this.viewProject(data.id)}>
                            <td>{data.taskName}</td>
                            <td>{data.taskProject}</td>
                            <td>{data.taskHours}</td>
                            <td>{data.taskDueDate}</td>
                          </tr>
                          </tbody>
                        ))}
                  
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <AddProject />
            </div>
        </div>
        );
      }
    if(!isLoading && viewProject) {
      return(
        <div>  
          {
            data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.filter(data => data.id === projectId).map(data => (
              <div key={data.id} className="viewUser">
              {
                (alertMsg.message) ? (
                  <Alert color="danger" style={{ marginTop: '10px' }}>
                    {alertMsg.message}
                  </Alert>
                ) : (null)
              }              
              <a
              onClick={this.viewProjects}
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
                  
                <div id="viewBoxHeading" className="viewUserContactView">
                  <div
                    
                    onClick={() => this.editUser(data.id, 41)}
                    className="viewUserContactViewLink"
                  >
                    <h2 className="viewUserContactViewData">{data.taskName}</h2>
                    <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                  </div>
              </div>
              <div id="editBoxHeading" className="viewUserContactEdit">
                  <Input 
                    type="text"
                    onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.taskName, updateToField: "taskName" })}
                    placeholder={data.taskName}
                  >         
                  </Input>
                  <FeatherIcon 
                    color="success" 
                    className="viewUserContactCheck" 
                    icon="check"
                    onClick={() => this.editUser(data.id, 42)} 
                  />
                </div>
                  
              </div>
              <div className="viewUserContact">
                  <h3>Contact</h3>
                  <div className="row">
                    <div className="col">

                      <div id="viewBox" className="viewUserContactView">
                          <div
                            
                            onClick={() => this.editUser(data.id, 1)}
                            className="viewUserContactViewLink"
                          >
                            <p className="viewUserContactViewData">{data.taskDesc}</p>
                            <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                          </div>
                        </div>
                        <div id="editBox" className="viewUserContactEdit">
                          <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.taskDesc, updateToField: "taskDesc" })}
                            placeholder={data.taskDesc}
                          >         
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data.id, 2)} 
                          />
                        </div>
                        
                        <div id="viewBox1" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data.id, 11)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.taskProject}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox1" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.taskProject, updateToField: "taskProject" })}
                            placeholder={data.taskProject}
                          >            
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data.id, 12)} 
                          />
                        </div>
                        
                      </div>
                      <div className="col">
                        <div id="viewBox2" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data.id, 21)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.taskHours}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox2" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.taskHours, updateToField: "taskHours" })}
                            placeholder={data.taskHours}
                          >            
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data.id, 22)} 
                          />
                        </div>

                        <div id="viewBox3" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data.id, 31)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.taskDueDate}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox3" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.taskDueDate, updateToField: "taskDueDate" })}
                            placeholder={data.taskDueDate}
                          >    
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data.id, 32)} 
                          />

                        </div>
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

  export default ViewProjects;
