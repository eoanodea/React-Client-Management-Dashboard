import React, { Component } from 'react';
import axios from 'axios';

export class ViewProject extends React.Component {
  state = {
    data: [],
    id: 0,
    itemId: 1,
    first: null,
    taskName: null,
    taskDesc: null,
    taskProject: null,
    taskHours: null,
    taskDueDate: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    dataDetail: null,
    idToFind: null
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
    // this.setState({ data: this.state.data, dataDetail: this.state.data });
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




  findInDB = idToFind => {
    const { data } = this.state;
    if(data.length <= 0) {
      console.log("no db entires")
    } else {
      console.log("What")
      }
      
    }
  
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
        taskProject: updateToApply,
        taskHours: updateToApply,
        taskDueDate: updateToApply
       }
    });
  };
  viewProject = () => {
    // filter(data => data.id === itemId.map(data)
    // const {data} = this.state;
    // console.log(data);
    const { data, first } = this.state;
    const id = 1;
    if(data.length <= 0) {
        // this.setState({
        //   first: data[0].taskName
        // });
    }

    console.log(first);
  }

  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data, itemId, dataDetail } = this.state;

  
    return (
      <div>  
        {data.length <= 0
        ? "NO DB ENTRIES YET"
        : data.filter(data => data.id === 1).map(data => (
          <div key={data.id} className="viewProject">
          <div className="viewProjectHeading">
              <p>{data.id}</p>
              <h2>{data.taskName}</h2>
          </div>
              {data.taskDesc}
              {data.taskProject}
              {data.taskHours}
              {data.taskDueDate}
          </div>
          ))}
          
        
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ taskName: e.target.value })}
            placeholder="Name"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ taskDesc: e.target.value })}
            placeholder="Desc"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ taskProject: e.target.value })}
            placeholder="Project"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ taskHours: e.target.value })}
            placeholder="Hours"
            style={{ width: "200px" }}
          />
          <input
            type="date"
            onChange={e => this.setState({ taskDueDate: e.target.value })}
            placeholder="DueDate"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(
            this.state.taskName, 
            this.state.taskDesc, 
            this.state.taskProject,
            this.state.taskHours, 
            this.state.taskDueDate
            )}>
            ADD
          </button>
        </div>
        {/* 
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div> */}
      </div>
    );
  }
}

export default ViewProject;
