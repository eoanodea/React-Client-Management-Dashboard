import React, { Component } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';


export class ViewData extends React.Component {
  // initialize our state 
  constructor(props) {
    super(props);
  }
  state = {
    data: [],
    title: "Projects",
    id: 0,
    itemId: null,
    taskName: null,
    taskDesc: null,
    taskData: null,
    taskHours: null,
    taskDueDate: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    isLoading: false,
    viewData: false,
    viewDatas: true,
    dataId: null
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
    taskData, 
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
      taskData: taskData,
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


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { 
        taskName: updateToApply,
        taskDesc: updateToApply,
        taskData: updateToApply,
        taskHours: updateToApply,
        taskDueDate: updateToApply
       }
    });
  };
  viewData() {
    this.setState({
      isLoading: false,
      viewDatas: false,
      viewData: true,
    })
    
  }
  viewDatas = () => {
    this.setState({
      isLoading: false,
      viewData: false,
      viewDatas: true,
      dataId: null
    })
  }
  loading() {
    return(
      <div className="loading">
        <FeatherIcon className="loadingIcon" icon="loader" size="54" />
      </div>
    );
  }

  userProjects(id) {
    this.state.title = "Projects";
    const { data } = this.state;
    return(
      <tbody>
      {
        data.length <= 0
        ? <FeatherIcon icon="loading"/>
        : data.filter(data => data.taskProject === id).map(data => (

                <tr key={data.id} className="fade-in" onClick={() => this.viewData(data.id)}>
                  <td>{data.id} </td>
                  <td>{data.taskName}</td>
                  <td>{data.taskDesc}</td>
                  <td>{data.taskData}</td>
                  <td>{data.taskHours}</td>
                  <td>{data.taskDueDate}</td>
                </tr>
              ))
            }
      </tbody>
    );  
  }


  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
      

    const { 
      data,
      isLoading,
      viewData,
      viewDatas,
      dataId
    } = this.state;
    let userId = this.props.id;
    if(isLoading) {
      return this.loading();
    }
    if(!isLoading && viewDatas) {
      return (
        <div className="col">
          <h3>{this.state.title}</h3>
          <div>
            <table className="table table-striped table-sm">
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Data</th>
                    <th>Hours Logged</th>
                    <th>Due date</th>
                  </tr>
              </thead>
              {
                userId != null
                ? this.userProjects(userId)
                : data.map(data => (
                  <tbody >
                    <tr key={data.id} className="fade-in" onClick={() => this.viewData(data.id)}>
                      <td>{data.id} </td>
                      <td>{data.taskName}</td>
                      <td>{data.taskDesc}</td>
                      <td>{data.taskData}</td>
                      <td>{data.taskHours}</td>
                      <td>{data.taskDueDate}</td>
                    </tr>
                    </tbody>
                  ))
              }
            </table>
          </div>
      </div>
      );
    }
    if(!isLoading && viewData) {
      return(
        <div>  
          {
            data.length <= 0
            ? <FeatherIcon icon="loading"/>
            : data.filter(data => data.id === 1).map(data => (
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
}

export default ViewData;
