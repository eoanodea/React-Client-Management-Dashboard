import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from 'reactstrap';
import axios from 'axios';

export class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  
  // initialize our state 
  state = {
    data: [],
    id: 0,
    taskName: null,
    taskDesc: null,
    taskProject: null,
    taskHours: null,
    taskDueDate: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
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
    fetch("http://localhost:3001/api/data/getData")
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
    taskDueDate,
    ) => {
    let userId = this.props.userId;
    if(userId != null) {
      taskProject = userId;
    }
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    console.log(taskProject + this.props.userId)
    axios.post("http://localhost:3001/api/data/putData", {
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
    this.toggle();
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

    axios.delete("http://localhost:3001/api/data/deleteData", {
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

    axios.post("http://localhost:3001/api/data/updateData", {
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
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data } = this.state;
    let userCompany = this.props.user;
    let userId = this.props.userId;

    return (  
      <div className="viewUserButton">
        <Button color="dark" onClick={this.toggle}>Add Project</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add a Project</ModalHeader>
          <ModalBody>
          <FormGroup>
          <Input
            type="text"
            onChange={e => this.setState({ taskName: e.target.value })}
            placeholder="Name"
          />
          </FormGroup>
          <FormGroup>
          <Input
            type="text"
            onChange={e => this.setState({ taskDesc: e.target.value })}
            placeholder="Desc"
          />
          </FormGroup>
          <FormGroup>
          {
            userId = null
            ? <Input
                type="text"
                onChange={e => this.setState({ taskProject: e.target.value })}
                placeholder="Project"
              />
            : <Input
                type="text"
                value={userCompany}
                disabled
                
          />
          }
          
          </FormGroup>
          <FormGroup>
          <Input
            type="text"
            onChange={e => this.setState({ taskHours: e.target.value })}
            placeholder="Hours"
          />
          </FormGroup>
          <FormGroup>
          <Input
            type="date"
            onChange={e => this.setState({ taskDueDate: e.target.value })}
            placeholder="DueDate"
            
          />
          </FormGroup>          
          </ModalBody>
          <ModalFooter>
          <Button
            color="dark" 
            onClick={() => this.putDataToDB(
              this.state.taskName, 
              this.state.taskDesc, 
              this.state.taskProject,
              this.state.taskHours, 
              this.state.taskDueDate
            )}
          >
          ADD
          </Button>
          </ModalFooter>
        </Modal>
      </div>

        
    );
  }
}

export default AddData;
